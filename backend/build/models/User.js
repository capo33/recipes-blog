"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: [true, "Please enter your answer"],
    },
    image: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    },
    about: {
        type: String,
        default: "No bio yet",
    },
    role: {
        type: String,
        default: "user",
    },
    savedRecipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    ownRecipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    phone: {
        type: String,
        default: "XXX-XXX-XXXX",
    },
    address: {
        type: String,
        default: "1234 Main St",
    },
    birthday: {
        type: Date,
        default: new Date(),
    },
    interests: {
        type: [String],
        default: ["None"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
