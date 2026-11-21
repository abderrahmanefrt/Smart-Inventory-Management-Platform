"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.updateProductSchema = exports.createProductSchema = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const zod_1 = require("zod");
// Zod validation schemas
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    price: zod_1.z.number().positive("Price must be positive"),
    quantity: zod_1.z.number().int().min(0, "Quantity cannot be negative"),
});
exports.updateProductSchema = exports.createProductSchema.partial();
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    tableName: "products",
    timestamps: true,
});
exports.default = Product;
//# sourceMappingURL=productModel.js.map