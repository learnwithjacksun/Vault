import { DashboardLayout } from "@/Layouts";

const Single = () => {
  return (
    <>
      <DashboardLayout>
        <h1 className="text-xl font-bold gradient-text font-sora">
          Add Single Item
        </h1>

        <form className="flex flex-col gap-2">
          <div className="border-t border-b border-line py-2 flex items-center gap-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="E.g. Voters ID"
              className="text-sm"
            />
          </div>
          <textarea
            className="w-full h-40 py-2 appearance-none text-sm"
            placeholder="Paste or type the item details here"
          />
          <button className="btn-secondary w-full h-10 rounded-md mt-4">
            Add Item
          </button>
        </form>
      </DashboardLayout>
    </>
  );
};

export default Single;
