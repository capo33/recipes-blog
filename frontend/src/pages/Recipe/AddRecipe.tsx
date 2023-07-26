import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import axios from "axios";

import "react-quill/dist/quill.snow.css";
import Editor from "../../components/Editor/Editor";
import { Recipe } from "../../interfaces/RecipeInterface";
import Category from "../../components/RecipeForm/Category";
import { userProfile } from "../../redux/feature/Auth/authSlice";
import CookingTime from "../../components/RecipeForm/CookingTime";
import Ingredients from "../../components/RecipeForm/Ingredients";
import { createRecipe } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import RecipeName from "../../components/RecipeForm/RecipeName";

const AddRecipe = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState<string | File>("");

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "recipe-app");
    data.append("cloud_name", "dunforh2u");
    // Make request to cloudinary
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dunforh2u/upload",
      data
    );
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      image: res.data.url,
    }));

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    setImage(file);
  };

  return (
    <Container className='px-5'>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Submit Your Recipe</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Share your amazing recipies with the world! We would love to see
            what you have to offer.
          </p>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className='row'>
          <RecipeName recipe={recipe} handleChange={handleChange} />
          <Ingredients
            recipe={recipe}
            handleDelete={handleDelete}
            handleClick={handleClick}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <Editor
            recipe={recipe}
            onChange={(value: string) =>
              setRecipe({ ...recipe, instructions: value })
            }
          />

          <Category recipe={recipe} handleChange={handleChange} />
          <CookingTime recipe={recipe} handleChange={handleChange} />

          <Col md={12}>
            <Form.Label htmlFor='image'> Upload image</Form.Label>
            <Form.Control
              type='file'
              name='image'
              className='form-control'
              onChange={handleImageChange}
            />
          </Col>
          <Col md={12} className='mt-4 mb-5'>
            <Button type='submit' className='w-100'>
              <AiOutlineSend /> Submit Recipe
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddRecipe;
