import { Schema, model } from "mongoose";
var categorySchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
}, {
    timestamps: true,
});
export default model("Category", categorySchema);
