"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
require("./models"); // Ensure models are loaded and registered
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await database_1.default.authenticate();
        console.log("Database connected successfully with Sequelize.");
        // Synchronize models with the database (creates tables if they do not exist)
        await database_1.default.sync();
        console.log("Database models synchronized successfully.");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
}
startServer();
//# sourceMappingURL=server.js.map