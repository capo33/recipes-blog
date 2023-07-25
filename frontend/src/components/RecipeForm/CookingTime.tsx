import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { Col, Form } from "react-bootstrap";

type CookingTimeProps = {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CookingTime = ({ recipe, handleChange }: CookingTimeProps) => {
  return (
    <Col md={4}>
      <Form.Label htmlFor='cookingTime'>Cooking Time</Form.Label>
      <Form.Control
        type='number'
        name='cookingTime'
        id='cookingTime'
        value={recipe?.cookingTime}
        onChange={handleChange}
        required
      />
    </Col>
  );
};

export default CookingTime;
