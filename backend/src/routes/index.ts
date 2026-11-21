import { Router } from "express";
import productsRoutes from "./productRoutes"

const router = Router();

router.get("/" , (req, res)=>{
  res.status(200).json(
    {
      messages: "Smart Inventory API is running!"
    }
  )
})

router.use("/api/products", productsRoutes);

export default router;
