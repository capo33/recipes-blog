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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const recipeController = __importStar(require("../controllers/RecipeController"));
const router = (0, express_1.Router)();
router.get("/", recipeController.getRecipes);
router.get("/random", recipeController.getRandomRecipes);
router.get("/latest", recipeController.getLatestRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.get("/savedRecipes/:id", recipeController.getRecipesByUser); // Own recipes
router.get("/savedRecipes/ids/:id", recipeController.getSavedRecipes); // Saved recipes
router.put("/saveRecipe", authMiddleware_1.protect, recipeController.saveRecipe);
router.put("/unsaveRecipe", authMiddleware_1.protect, recipeController.unsaveRecipe);
router.post("/", authMiddleware_1.protect, recipeController.createRecipe);
router.post("/:id/reviews", authMiddleware_1.protect, recipeController.addReview);
router.delete("/reviews/:recipeId/:reviewId", authMiddleware_1.protect, recipeController.deleteReview);
router.put("/like", authMiddleware_1.protect, recipeController.likeRecipe);
router.put("/unlike", authMiddleware_1.protect, recipeController.unlikeRecipe);
router.put("/:recipeId", authMiddleware_1.protect, recipeController.updateRecipe);
router.delete("/:recipeId", authMiddleware_1.protect, recipeController.deleteRecipe);
exports.default = router;
