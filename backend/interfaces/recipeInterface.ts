import { Document, Types } from "mongoose";

import { IReview } from "./reviewInterface";

interface Owner {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  image?: string;
  isAdmin?: boolean;
}
export interface IRecipe extends Document {
  name: string;
  instructions: string;
  ingredients: string[];
  image: string;
  cookingTime: number;
  views: number;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  slug: string;
  likes: Types.ObjectId[];
  category: Types.ObjectId;
  owner: Owner;
  createdAt: Date;
  updatedAt: Date;
}
