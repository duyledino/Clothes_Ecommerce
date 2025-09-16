import { z } from "zod";

export const createProductSchema = z.object({
  images: z
    .array(z.file({ message: "Please insert image" }))
    .min(1, { message: "Please insert at least one image" }),
  productName: z.string({ message: "Product name is missing" }),
  description: z.string({ message: "Description is missing" }),
  category: z
    .string({ message: "Category is missing" })
    .min(1, { message: "Category is required" }),
  subcategory: z
    .string({ message: "Subcategory is missing" }) // subcategory will be triggered if it is null so empty string still ignore
    .min(1, { message: "Subcategory is required" }),// this line will check empty string so 1 character will be passed
  price: z.number({ message: "Price is missing" }),
  size: z
    .array(z.string({ message: "Size is missing" }))
    .min(1, { message: "Please insert at least one size" }),
});
