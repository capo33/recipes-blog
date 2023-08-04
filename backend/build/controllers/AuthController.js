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
var bcrypt = __importStar(require("bcrypt"));
var User_1 = __importDefault(require("../models/User"));
var Recipe_1 = __importDefault(require("../models/Recipe"));
var generateToken_1 = require("../utils/generateToken");
var asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, answer, existingUser, salt, hashedPassword, newUser, token, _b, _, userWithoutPassword;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, answer = _a.answer;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existingUser = _c.sent();
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
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _c.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 3:
                hashedPassword = _c.sent();
                return [4 /*yield*/, User_1.default.create({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        answer: answer,
                    })];
            case 4:
                newUser = _c.sent();
                token = (0, generateToken_1.generateToken)(newUser._id);
                _b = newUser.toObject(), _ = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                // send response
                res.status(201).json(__assign({ success: true, message: "User created successfully", token: token }, userWithoutPassword));
                return [2 /*return*/];
        }
    });
}); });
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, isPasswordCorrect, token, _b, _, userWithoutPassword;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existingUser = _c.sent();
                if (!existingUser) {
                    res.status(400);
                    throw new Error("Invalid credentials");
                }
                return [4 /*yield*/, bcrypt.compare(password, existingUser.password)];
            case 2:
                isPasswordCorrect = _c.sent();
                if (!isPasswordCorrect) {
                    res.status(400);
                    throw new Error("Invalid credentials");
                }
                token = (0, generateToken_1.generateToken)(existingUser._id);
                _b = existingUser.toObject(), _ = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                // send response
                res.status(200).json(__assign({ success: true, token: token, message: "User logged in successfully" }, userWithoutPassword));
                return [2 /*return*/];
        }
    });
}); });
// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({
            success: true,
            message: "User logged out",
        });
        return [2 /*return*/];
    });
}); });
// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getProfile = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, recipe, token, _a, _, result;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, User_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).select("-password")];
            case 1:
                user = _d.sent();
                return [4 /*yield*/, Recipe_1.default.find({ owner: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }).populate("owner", "-password")];
            case 2:
                recipe = _d.sent();
                user === null || user === void 0 ? void 0 : user.set({ recipes: recipe });
                // check user existince
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                token = (0, generateToken_1.generateToken)(user === null || user === void 0 ? void 0 : user._id);
                _a = user.toObject(), _ = _a.password, result = __rest(_a, ["password"]);
                // send response
                res.status(200).json(__assign(__assign({ success: true, message: "Your profile" }, result), { token: token }));
                return [2 /*return*/];
        }
    });
}); });
// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, answer, newPassword, existingUser, salt, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, answer = _a.answer, newPassword = _a.newPassword;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
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
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(newPassword, salt)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(existingUser._id, {
                        password: hashedPassword,
                    })];
            case 4:
                user = _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Password updated successfully",
                    user: user,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Update user profile
// @route   PUT /api/v1/auth/update
// @access  Private
exports.updateProfile = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, req.body, { new: true })];
            case 2:
                updatedUser = _c.sent();
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    updatedUser: updatedUser,
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Update user profile by admin
// @route   PUT /api/v1/auth/user/:id
// @access  Private (admin only)
exports.updateUserByAdmin = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                // Check if user is admin
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
                    res.status(401);
                    throw new Error("You are not authorized to perform this action");
                }
                if (!user) return [3 /*break*/, 3];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.role = req.body.role || user.role;
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _b.sent();
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    updatedUser: updatedUser,
                });
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private (Admin or User)
exports.deleteUserByUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, recipes;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)];
            case 1:
                user = _e.sent();
                return [4 /*yield*/, Recipe_1.default.findOneAndDelete({
                        owner: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                    })];
            case 2:
                recipes = _e.sent();
                // Check if user exists with the given id
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                // Check if user is authorized to delete the user
                if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
                    res.status(401);
                    throw new Error("Not authorized to delete this user");
                }
                // Delete user
                return [4 /*yield*/, User_1.default.findByIdAndDelete((_d = req.user) === null || _d === void 0 ? void 0 : _d._id)];
            case 3:
                // Delete user
                _e.sent();
                // Delete recipes
                return [4 /*yield*/, (recipes === null || recipes === void 0 ? void 0 : recipes.deleteOne())];
            case 4:
                // Delete recipes
                _e.sent();
                res.status(200).json({
                    success: true,
                    message: "Sad to see you go, user deleted successfully",
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin
exports.deleteUserByAdmin = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, recipes, x, y;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, Recipe_1.default.findOneAndDelete({
                        owner: req.params.id,
                    })];
            case 2:
                recipes = _b.sent();
                // Check if user exists with the given id
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                // Check if user is an admin & authorized to delete the user
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
                    res.status(401);
                    throw new Error("Not authorized to delete this user");
                }
                return [4 /*yield*/, User_1.default.deleteOne({ _id: user._id })];
            case 3:
                x = _b.sent();
                return [4 /*yield*/, Recipe_1.default.deleteOne({ owner: user._id })];
            case 4:
                y = _b.sent();
                console.log(x, y);
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                });
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.find({}).select("-password")];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); });
// @desc    Get user by id
// @route   GET /api/v1/auth/user/:id
// @access  Public
exports.getUserProfile = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.findById(req.params.id).select("-password")];
            case 1:
                user = _a.sent();
                // Check if user exists with the given id
                if (!user) {
                    res.status(404);
                    throw new Error("User not found");
                }
                return [4 /*yield*/, Recipe_1.default.find({ owner: req.params.id })];
            case 2:
                recipes = _a.sent();
                res.status(200).json({ user: user, recipes: recipes });
                return [2 /*return*/];
        }
    });
}); });
