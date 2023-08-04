import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
// Load env vars
dotenv.config();
import { connectDB } from "./config/db";
import userRoutes from "./routes/Auth.routes";
import recipeRoutes from "./routes/Recipe.routes";
import categoryRoutes from "./routes/Category.routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";
// Initialize express
var app = express();
// Set port
var PORT = parseInt(process.env.PORT, 10) || 5000;
// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 100000, //
}));
app.use(cors());
// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/categories", categoryRoutes);
// Make uploads folder static
if (process.env.NODE_ENV === "production") {
    var __dirname_1 = path.resolve();
    app.use(express.static(path.join(__dirname_1, "/frontend/build")));
    // for any route that is not api, redirect to index.html
    app.get("*", function (req, res) {
        return res.sendFile(path.resolve(__dirname_1, "frontend", "build", "index.html"));
    });
}
else {
    // Welcome route
    app.get("/", function (req, res) {
        res.json({
            message: "API is running...",
        });
    });
}
// Error handler middleware
app.use(notFound);
app.use(errorHandler);
// Start server
try {
    app.listen(PORT, function () {
        console.log("Server is running on port ".concat(PORT, " \uD83D\uDE80"));
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error occured: (".concat(error.name, ": ").concat(error.message, ")"));
    }
}
