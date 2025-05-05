interface ThemeStore {
  theme: string;
  toggleTheme: () => void;
  fetchTheme: () => void;
}

type UserData = {
  passcode: string;
  securityQuestion: string;
  securityAnswer: string;
};

interface AuthContextType {
  userData: UserData;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  newUser: (
    passcode: string,
    securityQuestion: string,
    securityAnswer: string
  ) => void;
  verifyUser: (passcode: string) => void;
  verifySecurityQuestion: (
    securityAnswer: string,
    validAnswer: string
  ) => boolean;
  logout: () => void;
}

interface SingleItems {
  id: string;
  title: string;
  value: string;
}
