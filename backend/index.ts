import * as dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";
import cors from "cors";
// Load env vars
dotenv.config();

import { connectDB } from "./config/db";
import userRoutes from "./routes/Auth.routes";
import recipeRoutes from "./routes/Recipe.routes";
import categoryRoutes from "./routes/Category.routes";
 
import { errorHandler, notFound } from "./middlewares/errorHandler";

// Initialize express
const app: Application = express();

// Set port
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 100000, //
  })
);
app.use(cors());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/categories", categoryRoutes);
 
  
// Make uploads folder static
if (process.env.NODE_ENV === "production") {
  const __dirname: string = path.resolve();
   app.use(express.static(path.join(__dirname, "/frontend/build")));

  // for any route that is not api, redirect to index.html
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Welcome route
  app.get("/", (req, res) => {
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
  app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT} 🚀`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.name}: ${error.message})`);
  }
}
