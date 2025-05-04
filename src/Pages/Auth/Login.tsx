import { AuthLayout } from "@/Layouts";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <AuthLayout
        title="Welcome Back"
        description="Enter your passcode to access your vault"
      >
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="passcode" className="text-sm">
              6-digit passcode <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Passcode"
              className="input w-full"
            />
          </div>
          <p><Link to="/recover" className="text-sm text-muted underline">Forgot passcode?</Link></p>
          <button className="btn-primary btn w-full h-10 rounded-lg">Unlock Vault</button>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
