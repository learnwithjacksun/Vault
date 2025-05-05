import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { decryptData, encryptData } from "../Utils/cryptojs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    passcode: "",
    securityQuestion: "",
    securityAnswer: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const newUser = (
    passcode: string,
    securityQuestion: string,
    securityAnswer: string
  ) => {
    setIsLoading(true);

    try {
      const encryptedPasscode = encryptData(passcode);
      const encryptedSecurityQuestion = encryptData(securityQuestion);
      const encryptedSecurityAnswer = encryptData(securityAnswer);

      const newUser = {
        passcode: encryptedPasscode,
        securityQuestion: encryptedSecurityQuestion,
        securityAnswer: encryptedSecurityAnswer,
      };
      localStorage.setItem("questUser", JSON.stringify(newUser));
      sessionStorage.setItem("isAuthenticated", "true");
      setUserData({
        passcode: decryptData(encryptedPasscode),
        securityQuestion: decryptData(encryptedSecurityQuestion),
        securityAnswer: decryptData(encryptedSecurityAnswer),
      });
      console.log(userData);
      toast.success("User created successfully");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const verifyUser = (passcode: string) => {
    setIsLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("questUser") || "{}");
      const decryptedPasscode = decryptData(user.passcode);
      if (decryptedPasscode === passcode) {
        setIsAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        toast.error("Invalid passcode");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify user");
      throw new Error("Failed to verify user");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const verifySecurityQuestion = (
    securityAnswer: string,
    validAnswer: string
  ) => {
    setIsLoading(true);

    try {
      if (securityAnswer === validAnswer) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification.");
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // useEffect(() => {
  //   const getUser = () => {
  //     const user = JSON.parse(localStorage.getItem("questUser") || "{}");
  //     setUserData({
  //       passcode: decryptData(user.passcode),
  //       securityQuestion: decryptData(user.securityQuestion),
  //       securityAnswer: decryptData(user.securityAnswer),
  //     });
  //   };
  //   getUser();
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  //     if (isAuthenticated) {
  //       const user = JSON.parse(localStorage.getItem("questUser") || "{}");
  //       setIsAuthenticated(true);
  //       if (user) {
  //         setUserData({
  //           passcode: decryptData(user.passcode),
  //           securityQuestion: decryptData(user.securityQuestion),
  //           securityAnswer: decryptData(user.securityAnswer),
  //         });
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, [isAuthenticated]);

  const contextValue: AuthContextType = {
    userData,
    isLoading,
    newUser,
    verifyUser,
    verifySecurityQuestion,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
