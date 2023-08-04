 import * as bcrypt from "bcrypt";

import UserModel from "../models/User";

// Dummy data
async function insertDymmyUserData() {
  try {
    await UserModel.insertMany([
      {
        name: "Sara Smith",
        email: "sara@example.com",
        password: bcrypt.hashSync("123456", 10),
        answer: "Green",
        role: "admin",
      },
      {
        name: "Rami Malek",
        email: bcrypt.hashSync("123456", 10),
        password: "123456",
        answer: "Violet",
        role: "user",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

export default insertDymmyUserData;