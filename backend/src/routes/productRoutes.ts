import { Router } from "express";
import { getProducts ,CreateProducts, getProductsbyId,updateProduct, deleteProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", CreateProducts);
router.get("/:id", getProductsbyId);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
