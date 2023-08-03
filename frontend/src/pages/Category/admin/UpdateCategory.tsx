import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { RxUpdate } from "react-icons/rx";
import axios from "axios";

import {
  getCategoryBySlug,
  updateCategory,
} from "../../../redux/feature/Category/categorySlice";
import { ICategoryData } from "../../../interfaces/CategoryInterface";
import { useAppDispatch, useAppSelector } from "../../../redux/app/store";

const UpdateCategory = () => {
  const { slug } = useParams<{ slug: string }>();

  const { user } = useAppSelector((state) => state.auth);
  const { category } = useAppSelector((state) => state.category);

  const [categoryData, setCategoryData] = useState<ICategoryData>({
    name: (category?.name as string) || "",
    image: (category?.image as string) || "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getCategoryBySlug(slug as string));
  }, [dispatch, slug]);

  useEffect(() => {
    if (category) {
      setCategoryData(category as ICategoryData);
    }
  }, [category]);

  // Handle upload image
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
    setCategoryData({ ...categoryData, image: res.data.url });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        id: category?._id as string,
        categoryData,
        token,
        toast,
        navigate,
      })
    );
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Update Category</h1>
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
              onChange={uploadImage}
            />
          </Col>
          <Col md={4}>
            <img
              src={categoryData.image}
              alt={categoryData.name}
              className='rounded mt-2'
            />
          </Col>
          <Col md={12} className='mt-4 mb-5'>
            <Button type='submit' className='w-100'>
              <RxUpdate className='mx-1' /> Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateCategory;
