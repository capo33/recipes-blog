import React from "react";
import { Col, Form } from "react-bootstrap";

import { Recipe } from "../../interfaces/RecipeInterface";

type CookingTimeProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CookingTime = ({ recipe, handleChange }: CookingTimeProps) => {
  return (
    <Col md={6} className='mb-2'>
      <Form.Label htmlFor='cookingTime'>Cooking Time</Form.Label>
      <Form.Control
        type='number'
        name='cookingTime'
        id='cookingTime'
        value={recipe?.cookingTime || 0}
        onChange={handleChange}
        required
      />
    </Col>
  );
};

export default CookingTime;
