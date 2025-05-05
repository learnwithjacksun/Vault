import { AuthLayout } from "@/Layouts";
import { Link } from "react-router-dom";
import { useAuth } from "@/Hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Schemas/auth";
import { z } from "zod";
import { Loader } from "lucide-react";

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { verifyUser, isLoading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    verifyUser(data.passcode);
  };

  return (
    <>
      <AuthLayout
        title="Welcome Back"
        description="Enter your passcode to access your vault"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="passcode" className="text-sm">
              6-digit passcode <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Passcode"
              className="input w-full"
              {...register("passcode")}
            />
            {errors.passcode && (
              <p className="text-red-500 text-sm">{errors.passcode.message}</p>
            )}
          </div>
          <p><Link to="/recover" className="text-sm text-muted underline">Forgot passcode?</Link></p>
          <button disabled={isLoading} className="btn-primary btn w-full h-10 rounded-lg">
            {isLoading ? <Loader size={16} className="animate-spin" /> : "Unlock Vault"}
          </button>
          <p className="text-sm text-muted text-center mt-6">
            Don't have a vault?{" "}
            <Link to="/new" className="text-primary">
              Create one
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
