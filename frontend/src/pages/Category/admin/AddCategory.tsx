import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

import { Category } from "../../../interfaces/CategoryInterface";
import RecipeButton from "../../../components/RecipeForm/RecipeButton";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { createCategory } from "../../../redux/feature/Category/categorySlice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    image: "",
  });
  const [image, setImage] = useState<string>("");

  const { user } = useAppSelector((state) => state.auth);

  const token = user?.token as string;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Submit handler for form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
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
    // const file = e.currentTarget.files?.[0];
    // if (!file) return;
    setImage(e.currentTarget.files?.[0] as any);
  };

  return (
    <>
      {/* <div className='p-5 mt-10 max-w-md'>
        <div className='p-8 rounded border border-gray-200'>
          <h1 className='font-medium text-3xl'>Add Category</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-8 grid gap-4'>
              <div>
                <label
                  htmlFor='name'
                  className='text-sm text-gray-700 block mb-1 font-medium'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={categoryData.name}
                  id='name'
                  onChange={(e) =>
                    setCategoryData({ ...categoryData, name: e.target.value })
                  }
                  className='bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                  placeholder='e.g. Sports'
                />
              </div>
            </div>
            <div className='mt-8'>
              <img src={categoryData?.image} alt={categoryData?.name} />
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }: any) =>
                  setCategoryData({ ...categoryData, image: base64 })
                }
              />
            </div>

            <div className=' mt-8'>
              <RecipeButton title='Add' />
            </div>
          </form>
        </div>
      </div> */}

      <Container className='px-5'>
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
    </>
  );
};

export default AddCategory;
