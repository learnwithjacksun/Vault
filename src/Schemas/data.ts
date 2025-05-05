import { z } from "zod";

export const singleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

export const multipleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  values: z.array(z.string()).min(1, { message: "Values are required" }),
});


