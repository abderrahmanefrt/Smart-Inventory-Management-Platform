import { Router } from "express";
import { getProducts ,CreateProducts, getProductsbyId } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", CreateProducts);
router.get("/:id", getProductsbyId);

export default router;
