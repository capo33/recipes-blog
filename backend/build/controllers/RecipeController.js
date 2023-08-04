"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeRecipe = exports.likeRecipe = exports.deleteReview = exports.addReview = exports.getSavedRecipes = exports.getRecipesByUser = exports.unsaveRecipe = exports.saveRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getLatestRecipes = exports.getRandomRecipes = exports.getRecipeById = exports.getRecipes = void 0;
const User_1 = __importDefault(require("../models/User"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Category_1 = __importDefault(require("../models/Category"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
exports.getRecipes = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.default.find({})
        .populate("owner", "name image")
        .populate("category", "name image");
    res.status(200).json(recipes);
}));
//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
exports.getRecipeById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe_1.default.findById(req.params.recipeId)
        .populate("owner", "name image")
        .populate("category", "name image");
    // Add views
    const views = (recipe === null || recipe === void 0 ? void 0 : recipe.views) || 0;
    recipe === null || recipe === void 0 ? void 0 : recipe.set({ views: views + 1 });
    // Save recipe
    yield (recipe === null || recipe === void 0 ? void 0 : recipe.save());
    // Check if recipe exists with the given id
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    res.status(200).json(recipe);
}));
// @desc    Get Random Recipes
// @route   GET /api/v1/recipes/random
// @access  Public
exports.getRandomRecipes = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.default.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json(recipes);
}));
// @desc    Get Latest Recipes
// @route   GET /api/v1/recipes/latest
// @access  Public
exports.getLatestRecipes = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.default.find({}).sort({ createdAt: -1 }).limit(3);
    res.status(200).json(recipes);
}));
// @desc    Create a recipe
// @route   POST /api/v1/recipes
// @access  Private
exports.createRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    req.body;
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        res.status(401);
        throw new Error("Not authorized");
    }
    // Create a new recipe
    const newRecipe = yield Recipe_1.default.create(Object.assign(Object.assign({}, req.body), { owner: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }));
    // Add the recipe to the user
    yield User_1.default.findByIdAndUpdate((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id, {
        $push: { ownRecipes: newRecipe._id },
    });
    // Add the recipe to the category
    yield Category_1.default.findByIdAndUpdate(req.body.category, {
        $push: { recipes: newRecipe._id },
    });
    res.status(201).json({
        success: true,
        message: "Recipe created successfully",
        newRecipe,
    });
}));
//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
exports.updateRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { recipeId } = req.params;
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const recipe = yield Recipe_1.default.findById(recipeId);
    // Check if recipe exists with the given id
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    // Check if the user is the owner of the recipe
    if (recipe.owner.toString() !== ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const { name, ingredients, instructions, image, cookingTime, category } = req.body;
    recipe.name = name || recipe.name;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.image = image || recipe.image;
    recipe.cookingTime = cookingTime || recipe.cookingTime;
    recipe.category = category || recipe.category;
    yield recipe.save();
    res.status(200).json({
        success: true,
        message: "Recipe updated successfully",
        recipe,
    });
}));
//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
exports.deleteRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { recipeId } = req.params;
    yield User_1.default.findByIdAndUpdate((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id, {
        $pull: { ownRecipes: recipeId },
    });
    // Check if the user is logged in
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const recipe = yield Recipe_1.default.findById(recipeId);
    // Check if recipe exists with the given id
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    // Check if the user is the owner of the recipe
    if (recipe.owner.toString() !== ((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id.toString())) {
        res.status(401);
        throw new Error("Not authorized");
    }
    // Delete the recipe
    yield Recipe_1.default.findByIdAndDelete(recipeId);
    res.status(200).json({
        success: true,
        message: "Recipe deleted successfully",
    });
}));
// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
exports.saveRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user is logged in
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const recipe = yield Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes");
    const user = yield User_1.default.findById(req.body.userID);
    // Check if recipe exists with the given id
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    // Check if the user has already saved the recipe
    const isSaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
    if (isSaved) {
        res.status(400);
        throw new Error("Recipe already saved");
    }
    // Save the recipe
    yield User_1.default.findByIdAndUpdate(req.body.userID, {
        $push: { savedRecipes: recipe._id },
    }, { new: true } // to return the updated document
    );
    // user?.savedRecipes.push(recipe._id);
    // await user?.save();
    res.status(200).json({
        success: true,
        message: "Recipe saved successfully",
        savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
    });
}));
// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
exports.unsaveRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user is logged in
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const recipe = yield Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes");
    const user = yield User_1.default.findById(req.body.userID);
    // Check if recipe exists with the given id
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    // Check if the user has already saved the recipe
    const isUnsaved = !(user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id));
    if (isUnsaved) {
        res.status(400);
        throw new Error("Recipe already unsaved");
    }
    // Unsave the recipe
    yield User_1.default.findByIdAndUpdate(req.body.userID, {
        $pull: { savedRecipes: recipe._id },
    }, { new: true } // to return the updated document
    );
    res.status(200).json({
        success: true,
        message: "Recipe unsaved successfully",
        savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
    });
}));
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:id
// @access  Public
exports.getRecipesByUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // user id
    const user = yield User_1.default.findById(id)
        .populate("savedRecipes")
        .select("-password");
    console.log("user?.savedRecipes", user === null || user === void 0 ? void 0 : user.savedRecipes);
    res.status(201).json(user === null || user === void 0 ? void 0 : user.savedRecipes);
}));
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Public
exports.getSavedRecipes = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // user id
    const user = yield User_1.default.findById(id)
        .populate("savedRecipes", "name image")
        .select("password");
    const savedRecipes = yield Recipe_1.default.find({
        _id: { $in: user === null || user === void 0 ? void 0 : user.savedRecipes }, // find recipes with ids in the savedRecipes array
    })
        .populate("category", "name image")
        .populate("owner", "name image");
    res.status(201).json({ savedRecipes });
}));
// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
exports.addReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    // we need to get the rating and comment because we are going to send a number rating and a comment
    const { rating, comment } = req.body;
    // find the recipe
    const recipe = yield Recipe_1.default.findById(req.params.id)
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
    const alreadyReviewed = recipe.reviews.find((review) => { var _a, _b; return ((_a = review === null || review === void 0 ? void 0 : review.user) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString()); });
    if (alreadyReviewed) {
        res.status(400);
        throw new Error("Recipe already reviewed");
    }
    // create a review
    const review = {
        name: (_f = req.user) === null || _f === void 0 ? void 0 : _f.name,
        rating: Number(rating),
        comment: comment,
        user: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id,
    };
    // we push the new review to the recipe reviews array
    recipe.reviews.push(review);
    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;
    // we update/calculate the rating by getting the sum of all the ratings and dividing it by the number of reviews
    recipe.rating =
        ((_h = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _h === void 0 ? void 0 : _h.reduce((acc, item) => Number(item === null || item === void 0 ? void 0 : item.rating) + acc, 0)) /
            ((_j = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _j === void 0 ? void 0 : _j.length);
    // we save the recipe
    yield recipe.save();
    res.status(201).json({
        success: true,
        message: "Review added successfully",
        review,
    });
}));
// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
exports.deleteReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const { recipeId, reviewId } = req.params; // recipe id and review id
    const recipe = yield Recipe_1.default.findByIdAndUpdate(recipeId, {
        $pull: { reviews: { _id: reviewId } },
    }, { new: true });
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;
    // delete the rating of the deleted review
    // Recipe validation failed: rating: Cast to Number failed for value \"NaN\" (type number) at path \"rating\""
    recipe.rating =
        ((_k = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _k === void 0 ? void 0 : _k.length) > 0
            ? ((_l = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _l === void 0 ? void 0 : _l.reduce((acc, item) => Number(item === null || item === void 0 ? void 0 : item.rating) + acc, 0)) / ((_m = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _m === void 0 ? void 0 : _m.length)
            : 0;
    // we save the recipe
    yield recipe.save();
    res.status(201).json({
        success: true,
        message: "Review deleted successfully",
        recipe,
    });
}));
// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
exports.likeRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    // Like the recipe
    const recipe = yield Recipe_1.default.findByIdAndUpdate(recipeId, {
        $push: { likes: req.body.userId },
    }, { new: true });
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    res.status(200).json({
        success: true,
        message: "Recipe liked successfully",
        likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
    });
}));
// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
exports.unlikeRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    // Unlike the recipe
    const recipe = yield Recipe_1.default.findByIdAndUpdate(recipeId, {
        $pull: { likes: req.body.userId },
    }, { new: true });
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    res.status(200).json({
        success: true,
        message: "Recipe unliked successfully",
        likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
    });
}));
