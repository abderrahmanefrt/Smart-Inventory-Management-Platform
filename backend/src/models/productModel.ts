import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { z } from "zod";

// Zod validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

export const updateProductSchema = createProductSchema.partial();

// Sequelize Model Interfaces
export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  declare id: number;
  declare name: string;
  declare price: number;
  declare quantity: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
