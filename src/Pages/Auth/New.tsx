import { AuthLayout } from "@/Layouts";
import { HelpCircle } from "lucide-react";

const New = () => {
  return (
    <>
      <AuthLayout
        title="Secure Your Vault"
        description="Create a passcode and a security question to secure your vault."
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="passcode" className="text-sm">Create a 6-digit passcode <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="Enter Passcode"
                className="input w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="Confirm Passcode" className="text-sm">Confirm Passcode <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="Confirm Passcode"
                className="input w-full"
              />
            </div>
          </div>
          <div className="border-t border-line space-y-4 pt-4">
            <div className="flex gap-2">
                <HelpCircle size={16} className="flex-shrink-0 text-yellow-500"/>
                <p className="text-sm">
                    <span className="font-bold">Note:</span> This security question and answer is used to recover your vault if you forget your passcode.
                </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="security-question" className="text-sm">Security Question <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="E.g What is your favorite color?"
                className="input w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="security-answer" className="text-sm">Security Answer <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="E.g Blue"
                className="input w-full"
              />
            </div>
          </div>
          <button className="btn-primary btn w-full h-10 rounded-lg">Create Vault</button>
        </form>

       
      </AuthLayout>
    </>
  );
};

export default New;
