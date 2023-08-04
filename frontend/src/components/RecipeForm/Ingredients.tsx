import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { Alert, Badge, Button, Col, Form } from "react-bootstrap";

import { Recipe } from "../../interfaces/RecipeInterface";

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
    <Col md={12} className='mb-2'>
      <Form.Label htmlFor='ingredients'>Ingredients</Form.Label>
      {recipe && recipe?.ingredients?.length > 0 && (
        <Alert
          variant='secondary'
          className=' '
          style={{ overflow: "scroll" }}
        >
          {recipe?.ingredients?.map((ingredient) => (
            <span key={ingredient}>
              <Badge
                bg='success'
                text='white'
                className='mb-1 me-1 '
                style={{ fontSize: "1rem" }}
              >
                {ingredient}

                <RiDeleteBinLine
                  onClick={() => handleDelete(ingredient)}
                  className='mx-1'
                  style={{ cursor: "pointer" }}
                  aria-hidden='true'
                />
              </Badge>
            </span>
          ))}
        </Alert>
      )}

      <Form.Control
        type='text'
        name='ingredients'
        id='ingredients'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant='primary'
        size='sm'
        onClick={handleClick}
        className='mt-2 mb-'
        disabled={inputValue === ""}
      >
        <AiOutlinePlus className='h-5 w-5 text-gray-400' aria-hidden='true' />{" "}
        Add Ingredient
      </Button>
    </Col>
  );
};

export default Ingredients;
