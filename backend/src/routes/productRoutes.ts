import { Router } from "express";
import { getProducts ,CreateProducts } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", CreateProducts);

export default router;
