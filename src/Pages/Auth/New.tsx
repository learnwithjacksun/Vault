import { AuthLayout } from "@/Layouts";
import { HelpCircle, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserSchema } from "@/Schemas/auth";
import { useAuth } from "@/Hooks";
import { toast } from "sonner";

type NewUserFormData = z.infer<typeof newUserSchema>;

const New = () => {
  const { newUser, isLoading } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<NewUserFormData>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = (data: NewUserFormData) => {
    if(data.securityQuestion.includes("?")){
      newUser(data.passcode, data.securityQuestion, data.securityAnswer);
    }else{
      toast.error("Invalid security question. Missing '?'");
    }
  };

  return (
    <>
      <AuthLayout
        title="Secure Your Vault"
        description="Create a passcode and a security question to secure your vault."
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="passcode" className="text-sm">
                Create a 6-digit passcode{" "}
                <span className="text-red-500">*</span>
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
            <div className="space-y-2">
              <label htmlFor="Confirm Passcode" className="text-sm">
                Confirm Passcode <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Confirm Passcode"
                className="input w-full"
                {...register("confirmPasscode")}
              />
              {errors.confirmPasscode && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPasscode.message}
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-line space-y-4 pt-4">
            <div className="flex gap-2">
              <HelpCircle size={16} className="flex-shrink-0 text-yellow-500" />
              <p className="text-sm">
                <span className="font-bold">Note:</span> This security question
                and answer is used to recover your vault if you forget your
                passcode.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="security-question" className="text-sm">
                Security Question <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="E.g What is your favorite color?"
                className="input w-full"
                {...register("securityQuestion")}
              />
              {errors.securityQuestion && (
                <p className="text-red-500 text-sm">
                  {errors.securityQuestion.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="security-answer" className="text-sm">
                Security Answer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="E.g Blue"
                className="input w-full"
                {...register("securityAnswer")}
              />
              {errors.securityAnswer && (
                <p className="text-red-500 text-sm">
                  {errors.securityAnswer.message}
                </p>
              )}
            </div>
          </div>
          <button disabled={isLoading} className="btn-primary btn w-full h-10 rounded-lg">
            {isLoading ? <Loader size={16} className="animate-spin" /> : "Create Vault"}
          </button>
          <p className="text-sm text-muted text-center mt-6">
            Already have a vault?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default New;
