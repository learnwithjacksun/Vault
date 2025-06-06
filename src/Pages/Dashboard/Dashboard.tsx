import { Search } from "@/Components/UI";
import { DashboardLayout } from "@/Layouts";
import { useEffect, useState } from "react";
import { tab_buttons } from "@/Constants/data";
import clsx from "clsx";
import { ListFilter } from "lucide-react";
import { AddItem, SingleItems } from "@/Components/Dashboard";
import GroupItems from "@/Components/Dashboard/GroupItems";
import ImageItems from "@/Components/Dashboard/ImageItems";
import { toast } from "sonner";
const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("single");
  const [singleItems, setSingleItems] = useState<SingleItems[] | null>(null);

  useEffect(() => {
    const getItems = () => {
      try {
        const items = JSON.parse(localStorage.getItem("singleItem") || "[]");
        if (items) {
          setSingleItems(items);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to get items");
      }
    };
    return () => getItems();
  }, []);

  const filteredSingleItems = singleItems?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <DashboardLayout>
        <div className="space-y-4 border-b border-line pb-4">
          <Search search={search} setSearch={setSearch} />
          <div className="flex items-center gap-4">
            <ListFilter size={20} />
            <div className="flex items-center gap-2">
              {tab_buttons.map((button) => (
                <button
                  key={button.id}
                  className={clsx(
                    "h-8 px-6 rounded-lg",
                    button.id === tab ? "btn-secondary" : "bg-secondary"
                  )}
                  onClick={() => setTab(button.id)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {tab === "single" && (
          <>
            <SingleItems
              items={filteredSingleItems}
              setSingleItems={setSingleItems}
            />
          </>
        )}

        {tab === "group" && (
          <>
            <GroupItems />
          </>
        )}
        {tab === "images" && (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <ImageItems />
          </div>
        )}
      </DashboardLayout>

      <AddItem />
    </>
  );
};

export default Dashboard;
