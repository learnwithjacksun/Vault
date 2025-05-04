import { Modal } from "@/Components/UI";
import { AuthLayout } from "@/Layouts";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const Recover = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    try {
        navigator.clipboard.writeText("123456")
        setIsCopied(true)
        toast.success("Passcode copied to clipboard")
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    } catch (error) {
        console.log(error)
        toast.error("Failed to copy passcode")
    }
  }
  return (
    <>
      <AuthLayout
        title="Account Recovery"
        description="Provide the answer to your security question to recover your vault"
      >
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="security-question" className="text-sm">
              Security Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g What is your favorite color?"
              className="input w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="security-answer" className="text-sm">
              Security Answer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g Blue"
              className="input w-full"
            />
          </div>
          <button className="btn-primary btn w-full h-10 rounded-lg">
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
              <h1 className="text-2xl font-bold">123456</h1>
              {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} onClick={handleCopy} />}
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
