import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;  
  password: string;
  answer: string;
  image: string;
  about: string;
  savedRecipes: Types.ObjectId[];
  ownRecipes: Types.ObjectId[];
  phone: string;
   role: string;
  address: string;
  birthday: Date;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}
