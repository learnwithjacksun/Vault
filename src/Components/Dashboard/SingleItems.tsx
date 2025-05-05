import { decryptData } from "@/Utils/cryptojs";
import { Check, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SingleItems = ({ items , setSingleItems}: { items: SingleItems[] | undefined , setSingleItems: (items: SingleItems[]) => void }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [copy, setCopy] = useState(false);
  const [decryptValue, setDecryptValue] = useState("");

  const toggleShow = (id: string, value: string) => {
    if (activeItemId === id) {
      setActiveItemId(null); 
      setDecryptValue("");
    } else {
      setActiveItemId(id);
      setDecryptValue(decryptData(value));
    }
  };

  const handleCopy = () => {
    try {
      if (decryptValue) {
        navigator.clipboard.writeText(decryptValue);
        toast.success("Copied to clipboard");
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy");
    }
  };

  const handleDelete = (id: string) => {
    const newItems = items?.filter((item) => item.id !== id);
    if (newItems) {
      setSingleItems(newItems);
      localStorage.setItem("singleItem", JSON.stringify(newItems));
      toast.success("Item deleted successfully");
    }
  };

  return (
    <>
      {items?.map((item) => {
        const isActive = activeItemId === item.id;

        return (
          <div key={item.id} className="space-y-2 border-b border-line pb-4">
            <p className="text-muted text-sm">{item.title}</p>

            {isActive ? (
              <div className="flex items-center justify-between">
                <p className="text-main">{decryptValue}</p>
                <div className="flex items-center gap-2">
                  {copy ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={20} onClick={handleCopy} />
                  )}
                  <Trash2 onClick={() => handleDelete(item.id)} size={20} className="text-red-500" />
                  <EyeOff onClick={() => toggleShow(item.id, item.value)} size={20} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-main">XXXXXXXXX</p>
                <div className="flex items-center gap-2">
                  <Trash2 onClick={() => handleDelete(item.id)} size={20} className="text-red-500" />
                  <Eye onClick={() => toggleShow(item.id, item.value)} size={20} />
                </div>
              </div>
            )}
          </div>
        );
      })}

{!items?.length && (
            <div className=" text-center text-muted text-sm">
              <img
                src="/empty.svg"
                width={200}
                className="mx-auto"
              />
              <p>No Items found...</p>
            </div>
          )}
    </>
  );
};

export default SingleItems;
