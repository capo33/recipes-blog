import React, { useEffect } from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";

type CategoryProps = {
  recipe: Recipe | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Category = ({ recipe, handleChange }: CategoryProps) => {
  const { categories } = useAppSelector((state) => state.category);
  console.log("recipe?.category?.name", recipe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Col md={6} className='mb-2'>
      <Form.Label htmlFor='category'>Category</Form.Label>
      <Form.Select
        id='category'
        name='category'
        required
        value={recipe?.category._id}
        onChange={handleChange}
      >
        <option value=''>Select a category</option>
        {categories &&
          categories?.map((category) => (
            <option key={category?._id} value={category?._id}>
              {category.name}
            </option>
          ))}
      </Form.Select>
    </Col>
  );
};

export default Category;
