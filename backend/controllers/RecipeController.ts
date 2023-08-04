import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import CategoryModel from "../models/Category";
import asyncHandler from "../middlewares/asyncHandler";
import { IReview } from "../interfaces/reviewInterface";
import { IRecipe } from "../interfaces/recipeInterface";
import insertDymmyRecipeData from "../data/recipesData";

// Dummy data
// insertDymmyRecipeData();
// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
export const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  const recipes = await RecipeModel.find({})
    .populate("owner", "name image")
    .populate("category", "name image");

  res.status(200).json(recipes);
});

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

// @desc    Get Random Recipes
// @route   GET /api/v1/recipes/random
// @access  Public
export const getRandomRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const recipes = await RecipeModel.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json(recipes);
  }
);

// @desc    Get Latest Recipes
// @route   GET /api/v1/recipes/latest
// @access  Public
export const getLatestRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const recipes = await RecipeModel.find({}).sort({ createdAt: -1 }).limit(3);
    res.status(200).json(recipes);
  }
);

// @desc    Create a recipe
// @route   POST /api/v1/recipes
// @access  Private
export const createRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    req.body;

    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // Create a new recipe
    const newRecipe = await RecipeModel.create({
      ...req.body,
      owner: req?.user?._id,
    });

    // Add the recipe to the user
    await UserModel.findByIdAndUpdate(req?.user?._id, {
      $push: { ownRecipes: newRecipe._id },
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
    const { recipeId } = req.params;

    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(recipeId);

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

    const { name, ingredients, instructions, image, cookingTime, category } =
      req.body;

    recipe.name = name || recipe.name;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.image = image || recipe.image;
    recipe.cookingTime = cookingTime || recipe.cookingTime;
    recipe.category = category || recipe.category;

    await recipe.save();
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe,
    });
  }
);

//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.params;

    await UserModel.findByIdAndUpdate(req?.user?._id, {
      $pull: { ownRecipes: recipeId },
    });

    // Check if the user is logged in
    if (!req?.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const recipe = await RecipeModel.findById(recipeId);

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
    await RecipeModel.findByIdAndDelete(recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
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

    // user?.savedRecipes.push(recipe._id);
    // await user?.save();

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
    const isUnsaved = !user?.savedRecipes.includes(recipe._id);

    if (isUnsaved) {
      res.status(400);
      throw new Error("Recipe already unsaved");
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
// @route   GET /api/v1/recipes/savedRecipes/:id
// @access  Public
export const getRecipesByUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // user id
    const user = await UserModel.findById(id)
      .populate("savedRecipes")
      .select("-password");
    console.log("user?.savedRecipes", user?.savedRecipes);

    res.status(201).json(user?.savedRecipes);
  }
);

// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Public
export const getSavedRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // user id
    const user = await UserModel.findById(id)
      .populate("savedRecipes", "name image")
      .select("password");

    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.savedRecipes }, // find recipes with ids in the savedRecipes array
    })
      .populate("category", "name image")
      .populate("owner", "name image");

    res.status(201).json({ savedRecipes });
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

    // we update/calculate the rating by getting the sum of all the ratings and dividing it by the number of reviews
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

    // delete the rating of the deleted review
    // Recipe validation failed: rating: Cast to Number failed for value \"NaN\" (type number) at path \"rating\""
    recipe.rating =
      recipe?.reviews?.length > 0
        ? recipe?.reviews?.reduce(
            (acc, item) => Number(item?.rating) + acc,
            0
          ) / recipe?.reviews?.length
        : 0;

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
