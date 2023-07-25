import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Alert, Button, Col, Form } from "react-bootstrap";

type IngredientProps = {
  recipe: Recipe | null;
  inputValue: string;
  handleDelete: (ingredient: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const Ingredients = ({
  recipe,
  handleDelete,
  handleClick,
  inputValue,
  setInputValue,
}: IngredientProps) => {
  return (
    <Col md={12}>
      <Form.Label htmlFor='ingredients'>Ingredients</Form.Label>
      {recipe && recipe?.ingredients?.length > 0 && (
        <Alert variant='secondary'>
          {recipe?.ingredients?.map((ingredient) => (
            <span key={ingredient}>
              <span>{ingredient}</span>
              <MdOutlineDeleteForever
                onClick={() => handleDelete(ingredient)}
                className='h-5 w-5 text-gray-400'
                style={{ cursor: "pointer" }}
                aria-hidden='true'
              />
            </span>
          ))}
        </Alert>
      )}
      <Form.Control
        type='text'
        name='ingredients'
        id='ingredients'
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant='primary' onClick={handleClick} className='mt-2'>
        <AiOutlinePlus className='h-5 w-5 text-gray-400' aria-hidden='true' />{" "}
        Add Ingredient
      </Button>
    </Col>
  );
};

export default Ingredients;
