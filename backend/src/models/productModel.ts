
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),

  price: z.number().positive("Price must be positive"),

  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});


export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
