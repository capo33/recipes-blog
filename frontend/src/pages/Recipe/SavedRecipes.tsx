import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { subStringFunc } from "../../utils";
import {
  getSavedRecipes,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import "./style.css";
const SavedRecipes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const token = user?.token as string;
  const userID = user?._id as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
      dispatch(userProfile(token));
    }
  }, [dispatch, token, userID]);

  const handleUnsaveRecipe = (recipeID: string) => {
    dispatch(
      unsaveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  return (
    <section className='bg-white container px-6 py-10 mx-auto'>
      <h2 className='text-center mb-5 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
        {savedRecipes?.length === 0 ? "No saved recipes" : "My saved recipes"}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {savedRecipes?.map((myRecipe) => (
          <div
            className='  rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100'
            key={myRecipe?._id}
          >
            <img
              src={myRecipe?.image}
              alt={myRecipe?.name}
              className='object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500'
            />
            <div className='flex flex-col justify-between p-6 space-y-8'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-semibold tracki'>
                  {myRecipe?.name}
                </h2>
                <p
                  className='dark:text-gray-100'
                  dangerouslySetInnerHTML={{
                    __html: subStringFunc(myRecipe?.instructions as string, 25),
                  }}
                />
              </div>
              <div className='flex justify-between'>
                <Link
                  to={`/recipe-details/${myRecipe._id}`}
                  className='flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900'
                >
                  View
                </Link>

                <button
                  type='button'
                  className='flex items-center justify-center w-full p-3 rounded-md text-red-900'
                  onClick={() => handleUnsaveRecipe(myRecipe._id as string)}
                >
                  {/* <TrashIcon className='w-4 h-4' /> */}
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedRecipes;
