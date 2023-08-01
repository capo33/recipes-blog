import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";

import { Category } from "../../../interfaces/CategoryInterface";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { createCategory } from "../../../redux/feature/Category/categorySlice";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    image: "",
  });

  const { user } = useAppSelector((state) => state.auth);

  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const token = user?.token as string;
  
  // Loading state
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (loading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [loading]);

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

  // Submit handler for form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory({ categoryData, token, toast, navigate }));
    setCategoryData({
      name: "",
      image: "",
    });
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
              onChange={uploadImage}
              required
            />
            <Image
              src={categoryData?.image}
              alt={categoryData?.name}
              className='mt-3 rounded mx-auto d-block'
              style={{ width: "25%" }}
            />{" "}
          </Col>
          <Col md={12} className='mt-4 mb-5'>
            <Button
              type='submit'
              className='w-100'
              disabled={!categoryData.name || !categoryData.image || loading}
            >
              {loading ? (
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                <span>
                  <AiOutlinePlus /> Add Category
                </span>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCategory;
