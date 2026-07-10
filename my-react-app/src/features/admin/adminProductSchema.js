import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters"),

  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required"),
});