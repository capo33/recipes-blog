"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Load env vars
dotenv.config();
const db_1 = require("./config/db");
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const Recipe_routes_1 = __importDefault(require("./routes/Recipe.routes"));
const Category_routes_1 = __importDefault(require("./routes/Category.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Initialize express
const app = (0, express_1.default)();
// Set port
const PORT = parseInt(process.env.PORT, 10) || 5000;
// Connect to MongoDB
(0, db_1.connectDB)();
// Middleware
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 100000, //
}));
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/auth", Auth_routes_1.default);
app.use("/api/v1/recipes", Recipe_routes_1.default);
app.use("/api/v1/categories", Category_routes_1.default);
app.use("/api/v1/categories", Category_routes_1.default);
// Make uploads folder static
if (process.env.NODE_ENV === "production") {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    // for any route that is not api, redirect to index.html
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html")));
}
else {
    // Welcome route
    app.get("/", (req, res) => {
        res.json({
            message: "API is running...",
        });
    });
}
// Error handler middleware
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🚀`);
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log(`Error occured: (${error.name}: ${error.message})`);
    }
}
