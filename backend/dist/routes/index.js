"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).json({
        messages: "Smart Inventory API is running!"
    });
});
router.use("/api/products", productRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map