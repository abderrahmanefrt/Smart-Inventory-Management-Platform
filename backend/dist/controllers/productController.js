"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.CreateProducts = exports.getProductsbyId = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const getProducts = async (req, res) => {
    try {
        const products = await productModel_1.Product.findAll();
        return res.status(200).json({
            data: products,
            success: true,
            message: "List of products",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve products",
            data: null,
        });
    }
};
exports.getProducts = getProducts;
const getProductsbyId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productModel_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product found",
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve product",
            data: null,
        });
    }
};
exports.getProductsbyId = getProductsbyId;
const CreateProducts = async (req, res) => {
    try {
        const result = productModel_1.createProductSchema.safeParse(req.body);
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
        const newProduct = await productModel_1.Product.create({
            name,
            price,
            quantity,
        });
        return res.status(201).json({
            data: newProduct,
            success: true,
            message: "Product created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create product",
            data: null,
        });
    }
};
exports.CreateProducts = CreateProducts;
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productModel_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        const result = productModel_1.updateProductSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        await product.update(result.data);
        return res.status(200).json({
            data: product,
            success: true,
            message: "Product updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update product",
            data: null,
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productModel_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        await product.destroy();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete product",
            data: null,
        });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map