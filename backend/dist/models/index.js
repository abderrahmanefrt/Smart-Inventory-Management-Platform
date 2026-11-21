"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const productModel_1 = __importDefault(require("./productModel"));
exports.Product = productModel_1.default;
exports.default = { sequelize: database_1.default, Product: productModel_1.default };
//# sourceMappingURL=index.js.map