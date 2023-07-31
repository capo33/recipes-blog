import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";
import { Row, Col, Button, Form, Container, Image } from "react-bootstrap";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

import {
  getSingleRecipe,
  updateRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import Editor from "../../components/Editor/Editor";
import { Recipe } from "../../interfaces/RecipeInterface";
import Category from "../../components/RecipeForm/Category";
import RecipeName from "../../components/RecipeForm/RecipeName";
import Ingredients from "../../components/RecipeForm/Ingredients";
import CookingTime from "../../components/RecipeForm/CookingTime";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

const UpdateRecipe = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const [photo, setPhoto] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState<Recipe>({
    name: (recipe?.name as string) || "",
    ingredients: (recipe?.ingredients as string[]) || [],
    instructions: (recipe?.instructions as string) || "",
    image: (recipe?.image as string) || "",
    cookingTime: (recipe?.cookingTime as number) || 0,
    category: { _id: "", name: "", image: "", slug: "" },
    owner: {
      _id: user?._id as string,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getSingleRecipe(recipeId as string));
  }, [dispatch, recipeId]);

  useEffect(() => {
    if (recipe) {
      setFormData(recipe as Recipe);
    }
  }, [recipe]);

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Click handler for adding ingredients
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, inputValue],
    }));
    setInputValue("");
  };

  // Click handler for deleting ingredients
  const handleDelete = (ingredient: string) => {
    const newIngredients = formData.ingredients.filter(
      (ing) => ing !== ingredient
    );

    setFormData((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients as string[],
    }));
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_PRESET_NAME as string
    );
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      formData
    );
    setPhoto(res.data.url);
    setFormData((prevRecipe) => ({
      ...prevRecipe,
      image: res.data.url,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecipeData = {
      name: formData.name,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      image: formData.image,
      cookingTime: formData.cookingTime,
      category: formData.category,
      owner: formData.owner,
    };

    dispatch(
      updateRecipe({
        recipeId: recipeId as string,
        formData: newRecipeData,
        token,
        toast,
        navigate,
      })
    );
  };

  return (
    <Container>
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
          <RecipeName recipe={formData} handleChange={handleChange} />
          <Ingredients
            recipe={formData}
            handleDelete={handleDelete}
            handleClick={handleClick}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <Editor
            recipe={formData}
            onChange={(value: string) =>
              setFormData({ ...formData, instructions: value })
            }
          />

          <Category recipe={formData} handleChange={handleChange} />
          <CookingTime recipe={formData} handleChange={handleChange} />

          <Col md={12}>
            <Form.Label htmlFor='image'> Upload image</Form.Label>
            <Form.Control
              type='file'
              name='image'
              className='form-control'
              onChange={uploadImage}
             />
            <Image
              src={photo ? photo : formData.image}
              alt={formData.name}
              className="mt-3 rounded mx-auto d-block"
              style={{ width: "25%" }}
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

export default UpdateRecipe;
