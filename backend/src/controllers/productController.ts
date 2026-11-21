
import { Request, Response } from "express";
import { Op } from "sequelize";
import {
  Product,
  createProductSchema,
  updateProductSchema,
} from "../models/productModel";

// GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
   const page= Math.max(1, Number(req.query.page) || 1);
   const limit= Math.max(1, Number(req.query.limit) || 10);
   const offset = (page - 1) * limit;


const search = String(req.query.search || "").trim();
const minPrice = req.query.minPrice ? Number(req.query.minPrice) :undefined;
const maxPrice =req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

const priceCondition: any = {};
if (minPrice !== undefined) {
  priceCondition[Op.gte] = minPrice;
}

if (maxPrice !== undefined) {
  priceCondition[Op.lte] = maxPrice;
}


  const whereCondition = {
  ...(search && {
    name: {
      [Op.like]: `%${search}%`,
    },
  }),

  ...(minPrice !== undefined || maxPrice !== undefined
    ? {
        price: priceCondition,
      }
    : {}),
};

   const products = await Product.findAll({
     where: whereCondition,
     limit,
     offset,
     order:[['id', 'DESC']]
   });


 const count = await Product.count();

    return res.status(200).json({
      success: true,
      message: "List of products",
      data: products,

      pagination: {
        totalProducts: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("getProducts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      data: null,
    });
  }
};

// GET /api/products/:id
export const getProductsbyId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }

    const product = await Product.findByPk(id);

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
  } catch (error) {
    console.error("getProductsbyId error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      data: null,
    });
  }
};

// POST /api/products
export const CreateProducts = async (req: Request, res: Response) => {
  try {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
        data: null,
      });
    }

    const newProduct = await Product.create(result.data);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("CreateProducts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      data: null,
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    const result = updateProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
        data: null,
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
        data: null,
      });
    }

    await product.update(result.data);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      data: null,
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        data: null,
      });
    }

    const product = await Product.findByPk(id);

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
  } catch (error) {
    console.error("deleteProduct error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      data: null,
    });
  }
};
