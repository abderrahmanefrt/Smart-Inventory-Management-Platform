import { Request, Response } from "express";
import { createProductSchema } from "../models/productModel";
let products: any[] = [];

export const getProducts = (req:Request, res:Response) => {
  res.status(200).json({
    data: products,
    success: true,
    message: "List of products"
  });
}

export const CreateProducts =(req:Request, res:Response) =>{

  const result = createProductSchema.safeParse(req.body);

if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  const { name, price, quantity } = result.data;
const newProduct = {
    id: products.length + 1,
    name,
    price,
    quantity,
  };

  products.push(newProduct);
  
  res.status(201).json({
    data: newProduct,
    success: true,
    message:" Product created successfully"
  })

}

