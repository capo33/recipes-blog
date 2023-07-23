import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FileBase from "react-file-base64";
import "react-quill/dist/quill.snow.css";

import { Recipe } from "../../interfaces/RecipeInterface";
import Category from "../../components/RecipeForm/Category";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Ingredients from "../../components/RecipeForm/Ingredients";
// import Instructions from "../../components/RecipeForm/Instructions";
import RecipeButton from "../../components/RecipeForm/RecipeButton";
import { createRecipe } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import Editor from "../../components/Editor/Editor";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import RecipeName from "../../components/RecipeForm/RecipeName";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    ingredients: [],
    instructions: "",
    image: "",
    cookingTime: 0,
    category: { _id: "", name: "", image: "", slug: "" },

    owner: {
      _id: user?._id as string,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, token]);

  // Get user profile
  useEffect(() => {
    dispatch(userProfile(token));
  }, [dispatch, token]);

  // Click handler for adding ingredients
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  // Click handler for deleting ingredients
  const handleDelete = (ingredient: string) => {
    const newIngredients = recipe.ingredients.filter(
      (ing) => ing !== ingredient
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // Change handler for input field
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Submit handler for form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRecipe({ formData: recipe, token, toast }));
    navigate("/");
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      image: "",
      cookingTime: 0,
      category: { _id: "", name: "", image: "", slug: "" },
      owner: {
        _id: user?._id as string,
      },
    });
  };

  return (
    <div>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Submit Your Recipe</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Share your amazing recipies with thousands of web developers accross
            the world. Fill our form to get started.
          </p>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-8 alert alert-success' role='alert'></div>
        <div className='col-8 alert alert-danger' role='alert'></div>
        <div className='col-8'>
          <Form>
            <Row className='row g-3'>
              <RecipeName recipe={recipe} handleChange={handleChange} />
              <Ingredients
                recipe={recipe}
                handleDelete={handleDelete}
                handleClick={handleClick}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
              <Col md={12}>
                <Form.Label htmlFor='description'>Description</Form.Label>
                <Form.Control
                  type='text'
                  id='description'
                  name='description'
                  placeholder='Enter description'
                  required
                />
              </Col>
              <div className='col-12'>
                <label htmlFor='name' className='form-label'>
                  Recipe Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='form-control'
                />
              </div>
              <div className='col-12'>
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  className='form-control'
                  cols={30}
                  rows={4}
                  defaultValue={""}
                />
              </div>
              <div className='col-12'>
                <label htmlFor='name' className='form-label'>
                  Ingredients
                </label>
                <br />
                <small>Example: Ice</small>
                <div className='ingredientList'>
                  <div className='ingredeintDiv mb-1'>
                    <input
                      type='text'
                      name='ingredients'
                      className='form-control'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <button
                  type='button'
                  className='btn btn-outline-primary'
                  id='addIngredientsBtn'
                >
                  + Ingredient
                </button>
              </div>
              <div className='col-12'>
                <label htmlFor='category'>Select Category</label>
                <select
                  className='form-select form-control'
                  name='category'
                  aria-label='Category'
                >
                  <option selected>Select Category</option>
                  <option value='Thai'>Thai</option>
                  <option value='American'>American</option>
                  <option value='Chinese'>Chinese</option>
                  <option value='Mexican'>Mexican</option>
                  <option value='Indian'>Indian</option>
                </select>
              </div>
              <div className='col-12'>
                <label htmlFor='image'>Product Image</label>
                <input
                  type='file'
                  className='form-control'
                  name='image'
                  accept='image/*'
                />
              </div>
              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Submit Recipe
                </button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
