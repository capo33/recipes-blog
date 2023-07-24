import React, { useEffect } from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Form from "react-bootstrap/Form";

type CategoryProps = {
  recipe: Recipe | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Category = ({ recipe, handleChange }: CategoryProps) => {
  const { categories } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className='mt-1'>
      <Form.Label className='block text-sm font-medium text-gray-700'>
        Category
      </Form.Label>
      <Form.Select
        id='category'
        name='category'
        value={recipe?.category?._id}
        onChange={handleChange}
        className='shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block  border border-gray-300 rounded-md'
      >
        <option value=''>Select a category</option>
        {categories &&
          categories?.map((category) => (
            <option key={category?._id} value={category?._id}>
              {category.name}
            </option>
          ))}
      </Form.Select>
    </div>
  );
};

export default Category;
