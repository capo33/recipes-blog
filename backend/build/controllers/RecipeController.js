"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeRecipe = exports.likeRecipe = exports.deleteReview = exports.addReview = exports.getSavedRecipes = exports.getRecipesByUser = exports.unsaveRecipe = exports.saveRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getLatestRecipes = exports.getRandomRecipes = exports.getRecipeById = exports.getRecipes = void 0;
var User_1 = __importDefault(require("../models/User"));
var Recipe_1 = __importDefault(require("../models/Recipe"));
var Category_1 = __importDefault(require("../models/Category"));
var asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// Dummy data
// insertDymmyRecipeData();
// @desc    Get all recipes
// @route   GET /api/v1/recipes
// @access  Public
exports.getRecipes = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.find({})
                    .populate("owner", "name image")
                    .populate("category", "name image")];
            case 1:
                recipes = _a.sent();
                res.status(200).json(recipes);
                return [2 /*return*/];
        }
    });
}); });
//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
exports.getRecipeById = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe, views;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.findById(req.params.recipeId)
                    .populate("owner", "name image")
                    .populate("category", "name image")];
            case 1:
                recipe = _a.sent();
                views = (recipe === null || recipe === void 0 ? void 0 : recipe.views) || 0;
                recipe === null || recipe === void 0 ? void 0 : recipe.set({ views: views + 1 });
                // Save recipe
                return [4 /*yield*/, (recipe === null || recipe === void 0 ? void 0 : recipe.save())];
            case 2:
                // Save recipe
                _a.sent();
                // Check if recipe exists with the given id
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                res.status(200).json(recipe);
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get Random Recipes
// @route   GET /api/v1/recipes/random
// @access  Public
exports.getRandomRecipes = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.aggregate([{ $sample: { size: 3 } }])];
            case 1:
                recipes = _a.sent();
                res.status(200).json(recipes);
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get Latest Recipes
// @route   GET /api/v1/recipes/latest
// @access  Public
exports.getLatestRecipes = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.find({}).sort({ createdAt: -1 }).limit(3)];
            case 1:
                recipes = _a.sent();
                res.status(200).json(recipes);
                return [2 /*return*/];
        }
    });
}); });
// @desc    Create a recipe
// @route   POST /api/v1/recipes
// @access  Private
exports.createRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newRecipe;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                req.body;
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Recipe_1.default.create(__assign(__assign({}, req.body), { owner: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }))];
            case 1:
                newRecipe = _c.sent();
                // Add the recipe to the user
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id, {
                        $push: { ownRecipes: newRecipe._id },
                    })];
            case 2:
                // Add the recipe to the user
                _c.sent();
                // Add the recipe to the category
                return [4 /*yield*/, Category_1.default.findByIdAndUpdate(req.body.category, {
                        $push: { recipes: newRecipe._id },
                    })];
            case 3:
                // Add the recipe to the category
                _c.sent();
                res.status(201).json({
                    success: true,
                    message: "Recipe created successfully",
                    newRecipe: newRecipe,
                });
                return [2 /*return*/];
        }
    });
}); });
//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
exports.updateRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, _a, name, ingredients, instructions, image, cookingTime, category;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                recipeId = req.params.recipeId;
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Recipe_1.default.findById(recipeId)
                    // Check if recipe exists with the given id
                ];
            case 1:
                recipe = _c.sent();
                // Check if recipe exists with the given id
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                // Check if the user is the owner of the recipe
                if (recipe.owner.toString() !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                _a = req.body, name = _a.name, ingredients = _a.ingredients, instructions = _a.instructions, image = _a.image, cookingTime = _a.cookingTime, category = _a.category;
                recipe.name = name || recipe.name;
                recipe.ingredients = ingredients || recipe.ingredients;
                recipe.instructions = instructions || recipe.instructions;
                recipe.image = image || recipe.image;
                recipe.cookingTime = cookingTime || recipe.cookingTime;
                recipe.category = category || recipe.category;
                return [4 /*yield*/, recipe.save()];
            case 2:
                _c.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe updated successfully",
                    recipe: recipe,
                });
                return [2 /*return*/];
        }
    });
}); });
//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
exports.deleteRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                recipeId = req.params.recipeId;
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id, {
                        $pull: { ownRecipes: recipeId },
                    })];
            case 1:
                _c.sent();
                // Check if the user is logged in
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Recipe_1.default.findById(recipeId)];
            case 2:
                recipe = _c.sent();
                // Check if recipe exists with the given id
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                // Check if the user is the owner of the recipe
                if (recipe.owner.toString() !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                // Delete the recipe
                return [4 /*yield*/, Recipe_1.default.findByIdAndDelete(recipeId)];
            case 3:
                // Delete the recipe
                _c.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe deleted successfully",
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
exports.saveRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe, user, isSaved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Check if the user is logged in
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes")];
            case 1:
                recipe = _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.body.userID)];
            case 2:
                user = _a.sent();
                // Check if recipe exists with the given id
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                isSaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
                if (isSaved) {
                    res.status(400);
                    throw new Error("Recipe already saved");
                }
                // Save the recipe
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.userID, {
                        $push: { savedRecipes: recipe._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                // Save the recipe
                _a.sent();
                // user?.savedRecipes.push(recipe._id);
                // await user?.save();
                res.status(200).json({
                    success: true,
                    message: "Recipe saved successfully",
                    savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
exports.unsaveRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe, user, isUnsaved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Check if the user is logged in
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    res.status(401);
                    throw new Error("Not authorized");
                }
                return [4 /*yield*/, Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes")];
            case 1:
                recipe = _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.body.userID)];
            case 2:
                user = _a.sent();
                // Check if recipe exists with the given id
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                isUnsaved = !(user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id));
                if (isUnsaved) {
                    res.status(400);
                    throw new Error("Recipe already unsaved");
                }
                // Unsave the recipe
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.userID, {
                        $pull: { savedRecipes: recipe._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                // Unsave the recipe
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe unsaved successfully",
                    savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:id
// @access  Public
exports.getRecipesByUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, User_1.default.findById(id)
                        .populate("savedRecipes")
                        .select("-password")];
            case 1:
                user = _a.sent();
                console.log("user?.savedRecipes", user === null || user === void 0 ? void 0 : user.savedRecipes);
                res.status(201).json(user === null || user === void 0 ? void 0 : user.savedRecipes);
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Public
exports.getSavedRecipes = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, savedRecipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, User_1.default.findById(id)
                        .populate("savedRecipes", "name image")
                        .select("password")];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Recipe_1.default.find({
                        _id: { $in: user === null || user === void 0 ? void 0 : user.savedRecipes }, // find recipes with ids in the savedRecipes array
                    })
                        .populate("category", "name image")
                        .populate("owner", "name image")];
            case 2:
                savedRecipes = _a.sent();
                res.status(201).json({ savedRecipes: savedRecipes });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
exports.addReview = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, recipe, alreadyReviewed, review;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment;
                return [4 /*yield*/, Recipe_1.default.findById(req.params.id)
                        // .sort({ createdAt: -1 })
                        .populate({
                        path: "reviews",
                        populate: {
                            path: "user",
                            select: "name email",
                        },
                    })];
            case 1:
                recipe = _f.sent();
                // check if the recipe exists
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                alreadyReviewed = recipe.reviews.find(function (review) { var _a, _b; return ((_a = review === null || review === void 0 ? void 0 : review.user) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString()); });
                if (alreadyReviewed) {
                    res.status(400);
                    throw new Error("Recipe already reviewed");
                }
                review = {
                    name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
                    rating: Number(rating),
                    comment: comment,
                    user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
                };
                // we push the new review to the recipe reviews array
                recipe.reviews.push(review);
                // we update the number of reviews and the rating
                recipe.numReviews = recipe.reviews.length;
                // we update/calculate the rating by getting the sum of all the ratings and dividing it by the number of reviews
                recipe.rating =
                    ((_d = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _d === void 0 ? void 0 : _d.reduce(function (acc, item) { return Number(item === null || item === void 0 ? void 0 : item.rating) + acc; }, 0)) /
                        ((_e = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _e === void 0 ? void 0 : _e.length);
                // we save the recipe
                return [4 /*yield*/, recipe.save()];
            case 2:
                // we save the recipe
                _f.sent();
                res.status(201).json({
                    success: true,
                    message: "Review added successfully",
                    review: review,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
exports.deleteReview = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, recipeId, reviewId, recipe;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.params, recipeId = _a.recipeId, reviewId = _a.reviewId;
                return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(recipeId, {
                        $pull: { reviews: { _id: reviewId } },
                    }, { new: true })];
            case 1:
                recipe = _e.sent();
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                // we update the number of reviews and the rating
                recipe.numReviews = recipe.reviews.length;
                // delete the rating of the deleted review
                // Recipe validation failed: rating: Cast to Number failed for value \"NaN\" (type number) at path \"rating\""
                recipe.rating =
                    ((_b = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _b === void 0 ? void 0 : _b.length) > 0
                        ? ((_c = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _c === void 0 ? void 0 : _c.reduce(function (acc, item) { return Number(item === null || item === void 0 ? void 0 : item.rating) + acc; }, 0)) / ((_d = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _d === void 0 ? void 0 : _d.length)
                        : 0;
                // we save the recipe
                return [4 /*yield*/, recipe.save()];
            case 2:
                // we save the recipe
                _e.sent();
                res.status(201).json({
                    success: true,
                    message: "Review deleted successfully",
                    recipe: recipe,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
exports.likeRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recipeId = req.body.recipeId;
                return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(recipeId, {
                        $push: { likes: req.body.userId },
                    }, { new: true })];
            case 1:
                recipe = _a.sent();
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                res.status(200).json({
                    success: true,
                    message: "Recipe liked successfully",
                    likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
exports.unlikeRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recipeId = req.body.recipeId;
                return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(recipeId, {
                        $pull: { likes: req.body.userId },
                    }, { new: true })];
            case 1:
                recipe = _a.sent();
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                res.status(200).json({
                    success: true,
                    message: "Recipe unliked successfully",
                    likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
                });
                return [2 /*return*/];
        }
    });
}); });
