import axios from "axios";

import { RECIPE_URL } from "../../../constants/constants";
import { Recipe, Review } from "../../../interfaces/RecipeInterface";

// *************************** Recipe *************************** //
// get all recipes
const getAllRecipes = async () => {
  const response = await axios.get(`${RECIPE_URL}`);

  return response.data;
};

// Get a recipe by id
const getSingleRecipe = async (recipeId: string) => {
  const response = await axios.get(`${RECIPE_URL}/${recipeId}`);
  return response.data;
};

// Create a recipe
const createRecipe = async (formData: Recipe, token: string) => {
  const response = await axios.post(
    `${RECIPE_URL}`,
    { ...formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update a recipe image
// const uploadRecipeImage = async (data: string, token: string) => {
//   const response = await axios.post(`${UPLOAD_URL}`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// Save a recipe
const saveRecipe = async (recipeID: string, userID: string, token: string) => {
  const response = await axios.put(
    `${RECIPE_URL}/saveRecipe`,
    { recipeID, userID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.savedRecipes;
};

// Unsave a recipe
const unsaveRecipe = async (
  recipeID: string,
  userID: string,
  token: string
) => {
  const response = await axios.put(
    `${RECIPE_URL}/unsaveRecipe`,
    { recipeID, userID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.savedRecipes;
};

// Get a recipe by ID
const getRecipeById = async (userID: string) => {
  const response = await axios.get(`${RECIPE_URL}/savedRecipes/${userID}`);
  return response.data;
};

// Get saved recipes
const getRecipesByUserId = async (userID: string, token: string) => {
  const response = await axios.get(`${RECIPE_URL}/savedRecipes/ids/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.savedRecipes;
};

// Update a recipe
const updateRecipe = async (
  recipeID: string,
  formData: Recipe,
  token: string
) => {
  const response = await axios.put(
    `${RECIPE_URL}/${recipeID}`,
    { ...formData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete a recipe
const deleteRecipe = async (recipeId: string, token: string) => {
  const response = await axios.delete(`${RECIPE_URL}/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);

  return response.data;
};

// Like a recipe
const likeRecipe = async (recipeId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${RECIPE_URL}/like`,
    { recipeId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Unlike a recipe
const unlikeRecipe = async (
  recipeId: string,
  userId: string,
  token: string
) => {
  const response = await axios.put(
    `${RECIPE_URL}/unlike`,
    { recipeId, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// add a review
const addReview = async (recipeID: string, formData: Review, token: string) => {
  const response = await axios.post(
    `${RECIPE_URL}/${recipeID}/reviews`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// delete a review reviews/:recipeId/:reviewId
const deleteReview = async (
  recipeId: string,
  reviewId: string,
  token: string
) => {
  const response = await axios.delete(
    `${RECIPE_URL}/reviews/${recipeId}/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const recipeService = {
  getAllRecipes,
  createRecipe,
  getSingleRecipe,
  getRecipesByUserId,
  saveRecipe,
  unsaveRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  // uploadRecipeImage,
  likeRecipe,
  unlikeRecipe,
  addReview,
  deleteReview,
};

export default recipeService;
