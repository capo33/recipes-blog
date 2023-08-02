import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import { generateToken } from "../utils/generateToken";
import asyncHandler from "../middlewares/asyncHandler";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, answer } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Check the length of the password
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters long");
    }

    // Check if the answer is correct
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      answer,
    });

    // generate token
    const token = generateToken(newUser._id);

    // Take out password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    // send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      ...userWithoutPassword,
    });
  }
);

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    // generate token
    const token = generateToken(existingUser._id);

    // Take out password from response
    const { password: _, ...userWithoutPassword } = existingUser.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    // send response
    res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
      ...userWithoutPassword,
    });
  }
);

// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      message: "User logged out",
    });
  }
);

// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // get user from req.user
    const user = await UserModel.findById(req.user?._id).select("-password");
    const recipe = await RecipeModel.find({ owner: req.user?._id }).populate(
      "owner",
      "-password"
    );

    user?.set({ recipes: recipe });

    // check user existince
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // generate token
    const token = generateToken(user?._id);

    // Remove password
    const { password: _, ...result } = user.toObject();
    // send response
    res.status(200).json({
      success: true,
      message: "Your profile",
      ...result,
      token,
    });
  }
);

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, answer, newPassword } = req.body;

    // Check if user exists, if not throw error
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    // Check if email is provided
    if (!email) {
      res.status(400);
      throw new Error("Please provide your email");
    }

    // Check if answer is provided
    if (!answer) {
      res.status(400);
      throw new Error("Please provide your answer");
    }

    // // Check if answer is correct
    // const isAnswerCorrect = await bcrypt.compare(answer, existingUser.answer);

    // if (!isAnswerCorrect) {
    //   res.status(400);
    //   throw new Error("Invalid credentials");
    // }

    // Check if newPassword is provided
    if (existingUser.answer !== answer) {
      res.status(400);
      throw new Error("Invalid credentials");
    }
    // Check if newPassword is empty
    if (!newPassword) {
      res.status(400);
      throw new Error("Please provide a new password");
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    const user = await UserModel.findByIdAndUpdate(existingUser._id, {
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user,
    });
  }
);

// @desc    Update user profile
// @route   PUT /api/v1/auth/update
// @access  Private
export const updateProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Check if user exists
    const user = await UserModel.findById(req.user?._id); // req.user?._id is set by the auth middleware

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user?._id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  }
);

// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin or User
export const deleteUserByUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.user?._id);
    const recipes = await RecipeModel.findOneAndDelete({
      owner: req.user?._id,
    });
    // Check if user exists with the given id
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if user is authorized to delete the user
    if (user?._id.toString() !== req.user?._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this user");
    }

    // Delete user
    await UserModel.findByIdAndDelete(req.user?._id);
    // Delete recipes
    await recipes?.deleteOne();

    res.status(200).json({
      success: true,
      message: "Sad to see you go, user deleted successfully",
    });
  }
);

// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin
export const deleteUserByAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.params.id);
    const recipes = await RecipeModel.findOneAndDelete({
      owner: req.params.id,
    });
    // Check if user exists with the given id
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if user is an admin & authorized to delete the user
    if (req.user?.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized to delete this user");
    }

    // Delete user
    const x = await UserModel.deleteOne({ _id: user._id });
    // Delete recipes
    const y = await RecipeModel.deleteOne({ owner: user._id });

    console.log(x, y);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
export const getUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await UserModel.find({}).select("-password");

    res.status(200).json(users);
  }
);

// @desc    Get user by id
// @route   GET /api/v1/auth/user/:id
// @access  Public
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await UserModel.findById(req.params.id).select("-password");

    // Check if user exists with the given id
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Get user's recipes
    const recipes = await RecipeModel.find({ owner: req.params.id });

    res.status(200).json({ user, recipes });
  }
);
