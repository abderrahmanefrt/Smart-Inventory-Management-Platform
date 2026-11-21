import { Router } from "express";
import { getProducts ,CreateProducts, getProductsbyId,updateProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", CreateProducts);
router.get("/:id", getProductsbyId);
router.put("/:id", updateProduct);

export default router;
