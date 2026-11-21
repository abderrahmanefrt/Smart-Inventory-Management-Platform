import { Request, Response } from "express";

let products: any[] = [];

export const getProducts = (req:Request, res:Response) => {
  res.status(200).json({
    data: products,
    success: true,
    message: "List of products"
  });
}

export const CreateProducts =(req:Request, res:Response) =>{

  const {name, description, price, quantity}=req.body;
  const newProduct= {
    name,
    description,
    price,
    quantity
  }

  products.push(newProduct);
  res.status(201).json({
    data: newProduct,
    success: true,
    message: "Product created successfully"
  });
  res.status(201).json({
    data: newProduct,
    success: true,
    message:" Product created successfully"
  })

}

