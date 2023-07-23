import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import CategoryModel from "../models/Category";
import asyncHandler from "../middlewares/asyncHandler";
import { IReview } from "../interfaces/reviewInterface";
import { IRecipe } from "../interfaces/recipeInterface";

// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
export const getRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const recipes = await RecipeModel.find({})
      .populate("owner", "name image")
      .populate("category", "name image");

    res.status(200).json(recipes);
  }
);

//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
export const getRecipeById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const recipe = await RecipeModel.findById(req.params.recipeId)
      .populate("owner", "name image")
      .populate("category", "name image");

    // Add views
    const views: number = recipe?.views || 0;
    recipe?.set({ views: views + 1 });
    // Save recipe
    await recipe?.save();

    // Check if recipe exists with the given id
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    res.status(200).json(recipe);
  }
);

// @desc    Create a recipe
// @route   POST /api/v1/recipes
// @access  Private
export const createRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // Create a new recipe
    const newRecipe = await RecipeModel.create({
      ...req.body,
      owner: req?.user?._id,
    });

    // Add the recipe to the category
    await CategoryModel.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      newRecipe,
    });
  }
);

//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
export const updateRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(req.params.recipeId);

    // Check if recipe exists with the given id
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // Check if the user is the owner of the recipe
    if (recipe.owner.toString() !== req?.user?._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // Update the recipe
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      {
        new: true,
        runValidators: true, // runValidators is used to run the validators in the model (e.g. required, min, max, etc.)
      }
    );

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe,
    });
  }
);

//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(req.params.recipeId);

    // Check if recipe exists with the given id
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // Check if the user is the owner of the recipe
    if (recipe.owner.toString() !== req?.user?._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // Delete the recipe
    await RecipeModel.findByIdAndDelete(req.params.recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      recipe,
    });
  }
);

// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
export const saveRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(req.body.recipeID).populate(
      "category",
      "name image recipes"
    );
    const user = await UserModel.findById(req.body.userID);

    // Check if recipe exists with the given id
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // Check if the user has already saved the recipe
    const isSaved = user?.savedRecipes.includes(recipe._id);

    if (isSaved) {
      res.status(400);
      throw new Error("Recipe already saved");
    }

    // Save the recipe
    await UserModel.findByIdAndUpdate(
      req.body.userID,
      {
        $push: { savedRecipes: recipe._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Recipe saved successfully",
      savedRecipes: user?.savedRecipes,
    });
  }
);

// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
export const unsaveRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(req.body.recipeID).populate(
      "category",
      "name image recipes"
    );
    const user = await UserModel.findById(req.body.userID);

    // Check if recipe exists with the given id
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // Check if the user has already saved the recipe
    const isSaved = user?.savedRecipes.includes(recipe._id);

    if (!isSaved) {
      res.status(400);
      throw new Error("Recipe not saved");
    }

    // Unsave the recipe
    await UserModel.findByIdAndUpdate(
      req.body.userID,
      {
        $pull: { savedRecipes: recipe._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Recipe unsaved successfully",
      savedRecipes: user?.savedRecipes,
    });
  }
);

// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
export const getRecipesByUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.params.id)
      .populate("savedRecipes")
      .select("-password");

    res.status(201).json(user?.savedRecipes);
  }
);

// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
export const getSavedRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.params.userId)
      .populate("savedRecipes", "name image")
      .select("password");

    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.savedRecipes }, // find recipes with ids in the savedRecipes array
    })
      .populate("category", "name image")
      .populate("owner", "name");

    res.status(200).json({
      success: true,
      message: "Saved recipes",
      savedRecipes,
    });
  }
);

// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
export const addReview = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // we need to get the rating and comment because we are going to send a number rating and a comment
    const { rating, comment } = req.body;

    // find the recipe
    const recipe = await RecipeModel.findById(req.params.id)
      // .sort({ createdAt: -1 })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    // check if the recipe exists
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // Check if the user already reviewed the recipe before, so we match the review user with the logged in user
    const alreadyReviewed = recipe.reviews.find(
      (review) => review?.user?.toString() === req.user?._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Recipe already reviewed");
    }

    // create a review
    const review = {
      name: req.user?.name,
      rating: Number(rating),
      comment: comment,
      user: req.user?._id,
    };

    // we push the new review to the recipe reviews array
    recipe.reviews.push(review as IReview);

    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;

    // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
    recipe.rating =
      recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
      recipe?.reviews?.length;

    // we save the recipe
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  }
);

// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
export const deleteReview = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId, reviewId } = req.params; // recipe id and review id

    const recipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $pull: { reviews: { _id: reviewId } },
      },
      { new: true }
    );

    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;

    // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
    recipe.rating =
      recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
      recipe?.reviews?.length;

    // we save the recipe
    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Review deleted successfully",
      recipe,
    });
  }
);

// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
export const likeRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.body;

    // Like the recipe
    const recipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $push: { likes: req.body.userId },
      },
      { new: true }
    );
    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    res.status(200).json({
      success: true,
      message: "Recipe liked successfully",
      likes: recipe?.likes,
    });
  }
);

// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
export const unlikeRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.body;

    // Unlike the recipe
    const recipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $pull: { likes: req.body.userId },
      },
      { new: true }
    );

    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    res.status(200).json({
      success: true,
      message: "Recipe unliked successfully",
      likes: recipe?.likes,
    });
  }
);
