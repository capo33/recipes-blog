import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeServices from "./recipeServices";
import { Recipe, Review } from "../../../interfaces/RecipeInterface";

interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe | null;
  savedRecipes: Recipe[];
  ownRecipes: Recipe[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
  savedRecipes: [],
  ownRecipes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// *************************** Recipe *************************** //
// get all recipes
export const getAllRecipes = createAsyncThunk(
  "recipe/getAllRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await recipeServices.getAllRecipes();
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Get a recipe by id
export const getSingleRecipe = createAsyncThunk(
  "recipe/getSingleRecipe",
  async (recipeId: string, { rejectWithValue }) => {
    try {
      const response = await recipeServices.getSingleRecipe(recipeId);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Create a recipe
export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (
    {
      formData,
      token,
      toast,
    }: {
      formData: Recipe;
      token: string;
      toast: any;
    },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.createRecipe(formData, token);
      toast.success("Recipe created successfully");
      thunkAPI.dispatch(getAllRecipes());
      console.log("response", response);

      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get saved recipes
export const getSavedRecipes = createAsyncThunk(
  "recipe/getSavedRecipes",
  async ({ userID, token }: { userID: string; token: string }, thunkAPI) => {
    try {
      const response = await recipeServices.getRecipesByUserId(userID, token);
      thunkAPI.dispatch(getAllRecipes());
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Save a recipe
export const saveRecipe = createAsyncThunk(
  "recipe/saveRecipe",
  async (
    {
      recipeID,
      userID,
      token,
    }: { recipeID: string; userID: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.saveRecipe(recipeID, userID, token);
      thunkAPI.dispatch(getSavedRecipes({ userID, token }));
      // console.log("response", response); response is the saved recipe
      console.log("response", response);

      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Unsave a recipe
export const unsaveRecipe = createAsyncThunk(
  "recipe/unsaveRecipe",
  async (
    {
      recipeID,
      userID,
      token,
    }: { recipeID: string; userID: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.unsaveRecipe(
        recipeID,
        userID,
        token
      );

      thunkAPI.dispatch(getSavedRecipes({ userID, token }));
      // console.log("response", response); response is the unsaved recipe

      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// delete a recipe
export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (
    {
      recipeId,
      token,
      toast,
      navigate,
    }: { recipeId: string; token: string; toast: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.deleteRecipe(recipeId, token);
      console.log("response", response);

      toast.success("Recipe deleted successfully");
      navigate("/");
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// update a recipe
export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async (
    {
      recipeId,
      formData,
      token,
      toast,
      navigate,
    }: {
      recipeId: string;
      formData: any;
      token: string;
      toast: any;
      navigate: any;
    },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.updateRecipe(
        recipeId,
        formData,
        token
      );
      thunkAPI.dispatch(getAllRecipes());
      console.log("response", response);
      toast.success("Recipe updated successfully");
      navigate(`/recipe-details/${recipeId}`);
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// like a recipe
export const likeRecipe = createAsyncThunk(
  "recipe/likeRecipe",
  async (
    {
      recipeId,
      userId,
      token,
    }: { recipeId: string; userId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.likeRecipe(recipeId, userId, token);
      thunkAPI.dispatch(getAllRecipes());
      console.log("response", response);

      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// unlike a recipe
export const unlikeRecipe = createAsyncThunk(
  "recipe/unlikeRecipe",
  async (
    {
      recipeId,
      userId,
      token,
    }: { recipeId: string; userId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.unlikeRecipe(
        recipeId,
        userId,
        token
      );
      thunkAPI.dispatch(getAllRecipes());
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// add a review
export const addReview = createAsyncThunk(
  "recipe/addReview",
  async (
    {
      recipeID,
      formData,
      token,
      toast,
    }: { recipeID: string; formData: Review; token: string; toast: any },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.addReview(
        recipeID,
        formData,
        token
      );
      thunkAPI.dispatch(getSingleRecipe(recipeID));
      return response;
    } catch (error: unknown | any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// delete a review
export const deleteReview = createAsyncThunk(
  "recipe/deleteReview",
  async (
    {
      recipeId,
      reviewId,
      token,
      toast,
    }: { recipeId: string; reviewId: string; token: string; toast: any },
    thunkAPI
  ) => {
    try {
      const response = await recipeServices.deleteReview(
        recipeId,
        reviewId,
        token
      );
      toast.success("Review deleted successfully");
      thunkAPI.dispatch(getSingleRecipe(recipeId));
      return response;
    } catch (error: unknown | any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all recipes
    builder.addCase(getAllRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.recipes = payload as Recipe[];
      state.ownRecipes = payload as Recipe[];
    });
    builder.addCase(getAllRecipes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get a recipe by id
    builder.addCase(getSingleRecipe.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSingleRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = payload as Recipe;
      state.ownRecipes = [...state.ownRecipes, payload as Recipe];
    });
    builder.addCase(getSingleRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Create a recipe
    builder.addCase(createRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = payload as Recipe;
      state.ownRecipes = payload as Recipe[];
    });
    builder.addCase(createRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get saved recipes
    builder.addCase(getSavedRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSavedRecipes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(getSavedRecipes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Save a recipe
    builder.addCase(saveRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(saveRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Unsave a recipe
    builder.addCase(unsaveRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unsaveRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.savedRecipes = payload as Recipe[];
    });
    builder.addCase(unsaveRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Delete a recipe
    builder.addCase(deleteRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipes = payload as Recipe[];
      state.ownRecipes = payload as Recipe[];
    });
    builder.addCase(deleteRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Update a recipe
    builder.addCase(updateRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = payload as Recipe;
      state.ownRecipes = [...state.ownRecipes, payload as Recipe];
    });
    builder.addCase(updateRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Like a recipe
    builder.addCase(likeRecipe.pending, (state) => {
      state.isSuccess = false;
    });
    builder.addCase(likeRecipe.fulfilled, (state, { payload }) => {
      state.isSuccess = true;

      const newdata = state.recipes.map((recipe) => {
        if (recipe?._id === payload?.data?._id) {
          return payload?.data;
        }
        return recipe;
      });
      state.recipes = newdata;
    });
    builder.addCase(likeRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Unlike a recipe
    builder.addCase(unlikeRecipe.pending, (state) => {
      state.isSuccess = false;
    });
    builder.addCase(unlikeRecipe.fulfilled, (state, { payload }) => {
      state.isSuccess = true;
      console.log(payload);

      const newdata = state.recipes.map((recipe) => {
        if (recipe?._id === payload?.data?._id) {
          return payload?.data;
        }
        return recipe;
      });
      state.recipes = newdata;
    });
    builder.addCase(unlikeRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Add a review
    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addReview.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;

      const newdata = state.recipes.map((recipe) => {
        if (recipe?._id === payload?.recipe?._id) {
          return payload?.recipe;
        }
        return recipe;
      });
      state.recipes = newdata;
    });

    builder.addCase(addReview.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Delete a review
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;

      const newdata = state.recipes.map((recipe) => {
        if (recipe?._id === payload?.recipe?._id) {
          return payload?.recipe;
        }
        return recipe;
      });
      state.recipes = newdata;
    });

    builder.addCase(deleteReview.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Upload images
    //   builder.addCase(uploadImages.pending, (state) => {
    //     state.isLoading = true;
    //   });
    //   builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
    //     console.log(payload);

    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.recipes = payload;
    //   });
    //   builder.addCase(uploadImages.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = payload as string;
    //   });
  },
});

export const { setName } = recipeSlice.actions;

export default recipeSlice.reducer;
