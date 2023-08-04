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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const slugify_1 = __importDefault(require("slugify"));
const Category_1 = __importDefault(require("../models/Category"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.default.find({}).populate("recipes");
    res.status(200).json(categories);
}));
// @desc    Get a category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
exports.getCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // populate recipes with owner name and image
    const category = yield Category_1.default.findOne({
        slug: req.params.slug,
    }).populate({
        path: "recipes",
        populate: {
            path: "owner",
            select: "name image",
        },
    });
    // Check if category exists with the given slug
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json(category);
}));
// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
exports.createCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image } = req.body;
    const category = yield Category_1.default.create({
        name,
        slug: (0, slugify_1.default)(name),
        image,
    });
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
    });
}));
// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
exports.updateCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield Category_1.default.findById(id);
    // Check if category exists with the given slug
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    const { name, image } = req.body;
    category.name = name || category.name;
    category.slug = (0, slugify_1.default)(name) || category.slug;
    category.image = image || category.image;
    yield category.save();
    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
    });
}));
// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield Category_1.default.findByIdAndDelete(id);
    // Check if category exists with the given slug
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
}));
