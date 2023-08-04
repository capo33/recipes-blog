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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getUsers = exports.deleteUserByAdmin = exports.deleteUserByUser = exports.updateUserByAdmin = exports.updateProfile = exports.forgotPassword = exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const generateToken_1 = require("../utils/generateToken");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, answer } = req.body;
    // Check if user already exists
    const existingUser = yield User_1.default.findOne({ email });
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
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    const newUser = yield User_1.default.create({
        name,
        email,
        password: hashedPassword,
        answer,
    });
    // generate token
    const token = (0, generateToken_1.generateToken)(newUser._id);
    // Take out password from response
    const _a = newUser.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]); // we use toObject() instead of _doc in typescript to get the user object without the password
    // send response
    res.status(201).json(Object.assign({ success: true, message: "User created successfully", token }, userWithoutPassword));
}));
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if user exists
    const existingUser = yield User_1.default.findOne({ email });
    if (!existingUser) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    // Check if password is correct
    const isPasswordCorrect = yield bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    // generate token
    const token = (0, generateToken_1.generateToken)(existingUser._id);
    // Take out password from response
    const _b = existingUser.toObject(), { password: _ } = _b, userWithoutPassword = __rest(_b, ["password"]); // we use toObject() instead of _doc in typescript to get the user object without the password
    // send response
    res.status(200).json(Object.assign({ success: true, token, message: "User logged in successfully" }, userWithoutPassword));
}));
// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "User logged out",
    });
}));
// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // get user from req.user
    const user = yield User_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).select("-password");
    const recipe = yield Recipe_1.default.find({ owner: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }).populate("owner", "-password");
    user === null || user === void 0 ? void 0 : user.set({ recipes: recipe });
    // check user existince
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // generate token
    const token = (0, generateToken_1.generateToken)(user === null || user === void 0 ? void 0 : user._id);
    // Remove password
    const _e = user.toObject(), { password: _ } = _e, result = __rest(_e, ["password"]);
    // send response
    res.status(200).json(Object.assign(Object.assign({ success: true, message: "Your profile" }, result), { token }));
}));
// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, answer, newPassword } = req.body;
    // Check if user exists, if not throw error
    const existingUser = yield User_1.default.findOne({ email });
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
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(newPassword, salt);
    // Update user password
    const user = yield User_1.default.findByIdAndUpdate(existingUser._id, {
        password: hashedPassword,
    });
    res.status(200).json({
        success: true,
        message: "Password updated successfully",
        user,
    });
}));
// @desc    Update user profile
// @route   PUT /api/v1/auth/update
// @access  Private
exports.updateProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    // Check if user exists
    const user = yield User_1.default.findById((_f = req.user) === null || _f === void 0 ? void 0 : _f._id); // req.user?._id is set by the auth middleware
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Update user
    const updatedUser = yield User_1.default.findByIdAndUpdate((_g = req.user) === null || _g === void 0 ? void 0 : _g._id, req.body, { new: true });
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser,
    });
}));
// @desc    Update user profile by admin
// @route   PUT /api/v1/auth/user/:id
// @access  Private (admin only)
exports.updateUserByAdmin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    // Check if user exists
    const user = yield User_1.default.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Check if user is admin
    if (((_h = req.user) === null || _h === void 0 ? void 0 : _h.role) !== "admin") {
        res.status(401);
        throw new Error("You are not authorized to perform this action");
    }
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updatedUser = yield user.save();
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            updatedUser,
        });
    }
    // Update user
    // const updatedUser = await UserModel.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true }
    // );
    // res.status(200).json({
    //   success: true,
    //   message: "User updated successfully",
    //   updatedUser,
    // });
}));
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private (Admin or User)
exports.deleteUserByUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m;
    const user = yield User_1.default.findById((_j = req.user) === null || _j === void 0 ? void 0 : _j._id);
    const recipes = yield Recipe_1.default.findOneAndDelete({
        owner: (_k = req.user) === null || _k === void 0 ? void 0 : _k._id,
    });
    // Check if user exists with the given id
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Check if user is authorized to delete the user
    if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== ((_l = req.user) === null || _l === void 0 ? void 0 : _l._id.toString())) {
        res.status(401);
        throw new Error("Not authorized to delete this user");
    }
    // Delete user
    yield User_1.default.findByIdAndDelete((_m = req.user) === null || _m === void 0 ? void 0 : _m._id);
    // Delete recipes
    yield (recipes === null || recipes === void 0 ? void 0 : recipes.deleteOne());
    res.status(200).json({
        success: true,
        message: "Sad to see you go, user deleted successfully",
    });
}));
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin
exports.deleteUserByAdmin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    const user = yield User_1.default.findById(req.params.id);
    const recipes = yield Recipe_1.default.findOneAndDelete({
        owner: req.params.id,
    });
    // Check if user exists with the given id
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Check if user is an admin & authorized to delete the user
    if (((_o = req.user) === null || _o === void 0 ? void 0 : _o.role) !== "admin") {
        res.status(401);
        throw new Error("Not authorized to delete this user");
    }
    // Delete user
    const x = yield User_1.default.deleteOne({ _id: user._id });
    // Delete recipes
    const y = yield Recipe_1.default.deleteOne({ owner: user._id });
    console.log(x, y);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
}));
// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}).select("-password");
    res.status(200).json(users);
}));
// @desc    Get user by id
// @route   GET /api/v1/auth/user/:id
// @access  Public
exports.getUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id).select("-password");
    // Check if user exists with the given id
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    // Get user's recipes
    const recipes = yield Recipe_1.default.find({ owner: req.params.id });
    res.status(200).json({ user, recipes });
}));
