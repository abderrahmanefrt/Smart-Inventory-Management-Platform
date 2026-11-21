"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
exports.sequelize = databaseUrl
    ? new sequelize_1.Sequelize(databaseUrl, {
        dialect: "postgres",
        logging: false,
    })
    : new sequelize_1.Sequelize(process.env.DB_NAME || "smart_inventory", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "abdou010203", {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
    });
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map