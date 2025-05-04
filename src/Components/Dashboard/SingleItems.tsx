import { Check, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SingleItems = () => {
  const [show, setShow] = useState(false);
  const [copy, setCopy] = useState(false);
  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText("12345678901");
      toast.success("Copied to clipboard");
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-2 border-b border-line pb-4">
      <p className="text-muted text-sm">BVN</p>
      {show && (
        <div className="flex items-center justify-between">
          <p className="text-main">12345678901</p>
          <div className="flex items-center gap-2">
            {copy ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={20} onClick={handleCopy} />
            )}
            <Trash2 size={20} className="text-red-500" />
            <EyeOff onClick={toggleShow} size={20} />
          </div>
        </div>
      )}
      {!show && (
        <div className="flex items-center justify-between">
          <p className="text-main">XXXXXXXXX</p>
          <div className="flex items-center gap-2">
            <Trash2 size={20} className="text-red-500" />
            <Eye onClick={toggleShow} size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItems;
