import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { Col, Form } from "react-bootstrap";

type RecipeNameProps = {
  recipe: Recipe | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RecipeName = ({ recipe, handleChange }: RecipeNameProps) => {
  return (
    <Col md={12} className="mb-2">
      <Form.Label htmlFor='title'>Name</Form.Label>
      <Form.Control
        type='text'
        name='name'
        id='name'

        
        value={recipe?.name ? recipe.name : ""}
        onChange={handleChange}
        placeholder='Write a name for your recipe'
        required
      />
    </Col>
  );
};

export default RecipeName;
