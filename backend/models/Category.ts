import { Schema, model } from "mongoose";

import { ICategory } from "../interfaces/categoryInterface";

const categorySchema = new Schema<ICategory>(
  {
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
  },
  {
    timestamps: true,
  }
);

export default model<ICategory>("Category", categorySchema);
