import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { Category } from "../../../interfaces/CategoryInterface";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { createCategory } from "../../../redux/feature/Category/categorySlice";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    image: "",
  });

  const { user } = useAppSelector((state) => state.auth);

  const token = user?.token as string;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Submit handler for form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", categoryData.image);
    data.append("upload_preset", "recipe-app");
    data.append("cloud_name", "dunforh2u");
    // Make request to cloudinary
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dunforh2u/image/upload",
      data
    );

    console.log("categoryData", categoryData);
    const catData = {
      name: categoryData.name,
      image: res.data.url,
    };

    dispatch(createCategory({ categoryData: catData, token, toast, navigate }));
    setCategoryData({
      name: "",
      image: "",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    categoryData.image = file as any;
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Add Category</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>Add a new category to your recipe.</p>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={categoryData.name}
              id='name'
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              placeholder='e.g. Sports'
            />
          </Col>

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
              <AiOutlinePlus /> Add Category
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCategory;
