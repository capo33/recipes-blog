"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
        required: true,
        default: "no photo",
    },
    recipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Category", categorySchema);
