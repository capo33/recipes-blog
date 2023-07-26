import slugify from "slugify";
import { Request, Response } from "express";

import CategoryModel from "../models/Category";
import asyncHandler from "../middlewares/asyncHandler";

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const categories = await CategoryModel.find({}).populate("recipes");

    res.status(200).json(categories);
  }
);

// @desc    Get a category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
export const getCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // populate recipes with owner name and image
    const category = await CategoryModel.findOne({
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
  }
);

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, image } = req.body;
    const category = await CategoryModel.create({
      name,
      slug: slugify(name),
      image,
      
     });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  }
);

// @desc    Update a category

// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    // Check if category exists with the given slug
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  }
);

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryModel.findOneAndDelete({
      id: req.params.id,
    });

    // Check if category exists with the given slug
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }
);
