import { Modal } from "@/Components/UI";
import { AuthLayout } from "@/Layouts";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/Hooks";
import { decryptData } from "@/Utils/cryptojs";

const Recover = () => {
  const { verifySecurityQuestion } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    passcode: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  useEffect(() => {
    const getUser = () => {
      const rawUser = localStorage.getItem("questUser");
      if (!rawUser) {
        toast.error("User data not found in localStorage");
        return;
      }
      const user = JSON.parse(rawUser);
      setUserData({
        passcode: decryptData(user.passcode),
        securityQuestion: decryptData(user.securityQuestion),
        securityAnswer: decryptData(user.securityAnswer),
      });
    };
    return ()=> getUser();
  }, []);

  console.log(userData)
  const handleCopy = () => {
    try {
      const decryptedPasscode = decryptData(userData?.passcode);
      navigator.clipboard.writeText(decryptedPasscode);
      setIsCopied(true);
      toast.success("Passcode copied to clipboard");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy passcode");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.length === 0) {
      setError("Security answer is required");
      return;
    }

    console.log(userData.securityAnswer, answer)
    const isVerified = verifySecurityQuestion(userData.securityAnswer, answer);
    if (isVerified) {
      setIsOpen(true);
    } else {
      toast.error("Invalid security answer");
    }
  };

  return (
    <>
      <AuthLayout
        title="Account Recovery"
        description="Provide the answer to your security question to recover your vault"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="border border-line rounded-lg overflow-hidden">
            <p className="text-sm text-muted p-2">Security Question</p>
            <p className="bg-secondary p-2">{userData.securityQuestion || "Not found"}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="security-answer" className="text-sm">
              Security Answer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g Blue"
              className="input w-full"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary btn w-full h-10 rounded-lg"
          >
            Recover Vault
          </button>
        </form>
      </AuthLayout>

      {isOpen && (
        <Modal
          title="Vault Recovered"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p className="text-sm text-muted">
            Your vault has been recovered successfully. You can now login to
            your account.
          </p>
          <div className="space-y-2 p-3 rounded-lg dark:bg-foreground/50 bg-foreground my-4">
            <p className="text-sm">Passcode</p>
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-2xl font-bold">
                {userData.passcode ? decryptData(userData.passcode) : "N/A"}
              </h1>

              {isCopied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy
                  size={16}
                  onClick={handleCopy}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          <Link to="/login" className="btn-primary btn w-full h-10 rounded-lg">
            Login
          </Link>
        </Modal>
      )}
    </>
  );
};

export default Recover;
