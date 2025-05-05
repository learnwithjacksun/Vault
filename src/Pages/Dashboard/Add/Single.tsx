import { DashboardLayout } from "@/Layouts";
import { singleSchema } from "@/Schemas/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { encryptData } from "@/Utils/cryptojs";
import { useNavigate } from "react-router-dom";
type SingleSchema = z.infer<typeof singleSchema>;

const Single = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingleSchema>({
    resolver: zodResolver(singleSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: SingleSchema) => {
    try {
      const newItem = {
        id: crypto.randomUUID(),
        title: data.title,
        value: encryptData(data.value),
      };
      const items = JSON.parse(localStorage.getItem("singleItem") || "[]");
      localStorage.setItem("singleItem", JSON.stringify([newItem, ...items]));
      toast.success("Item added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item");
    }
  };
  return (
    <>
      <DashboardLayout>
        <h1 className="text-xl font-bold gradient-text font-sora">
          Add Single Item
        </h1>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-t border-b border-line py-2 flex items-center gap-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="E.g. Voters ID"
              className="text-sm"
              autoComplete="off"
              autoFocus
              {...register("title")}
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          <textarea
            className="w-full h-40 py-2 appearance-none text-sm"
            placeholder="Paste or type the item details here"
            {...register("value")}
          />
          {errors.value && (
            <p className="text-red-500 text-sm">{errors.value.message}</p>
          )}
          <button className="btn-secondary w-full h-10 rounded-md mt-4">
            Add Item
          </button>
        </form>
      </DashboardLayout>
    </>
  );
};

export default Single;
