import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

import {
  updateUserProfile,
  userProfile,
} from "../../redux/feature/Auth/authSlice";
import Input from "../../components/ProfileForm/Input";
import Textarea from "../../components/ProfileForm/Textarea";
import { IUpdateProfile } from "../../interfaces/AuthInterface";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import Loader from "../../components/Loader/Index";

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUpdateProfile>({
    name: (user?.name as string) || "",
    email: (user?.email as string) || "",
    address: (user?.address as string) || "",
    phone: (user?.phone as string) || "",
    about: (user?.about as string) || "",
    birthday: (user?.birthday as Date) || new Date(),
    image: (user?.image as string) || "",
    interests: (user?.interests as []) || [],
  });

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

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

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
    const image = res.data.secure_url;
    setUserData({ ...userData, image });
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userData: userData as any,
        token,
        toast,
        navigate,
      })
    );
    navigate("/profile");
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>
          Update your <span className='text-primary'>Profile</span>
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Add information about yourself to share on your profile.
          </p>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className='row'>
          <Col md={12}>
            <Input
              label='Name'
              type='text'
              name='name'
              value={userData?.name || ""}
              handleChange={handleChange}
              placeholder='Name'
            />
          </Col>
          <Col md={12}>
            <Input
              label='Address'
              type='text'
              name='address'
              value={userData?.address || ""}
              handleChange={handleChange}
              placeholder='Address'
            />
          </Col>
          <Col md={12}>
            <Input
              label='Email'
              type='email'
              name='email'
              value={userData?.email || ""}
              handleChange={handleChange}
              placeholder='Email'
            />
          </Col>
          <Col md={12}>
            <Input
              label='Phone'
              type='tel'
              name='phone'
              value={userData?.phone || ""}
              handleChange={handleChange}
              placeholder='Phone'
            />
          </Col>
          <Col md={12}>
            <Input
              label='Birthday'
              type='date'
              name='birthday'
              value={userData?.birthday?.toString().slice(0, 10) || ""}
              handleChange={handleChange}
              placeholder='Birthday'
            />
          </Col>
          <Col md={12}>
            <Input
              label='Interests'
              type='text'
              name='interests'
              value={userData?.interests?.toString() || ""}
              handleChange={handleChange}
              placeholder='Interests'
            />
          </Col>
          <Col md={12}>
            <Textarea
              label='About Me'
              name='about'
              value={userData?.about || ""}
              handleChange={handleChange}
              placeholder='About Me'
            />
          </Col>
          <Col md={12}>
            <Form.Label htmlFor='bio' className='mt-2'>
              Upload image
            </Form.Label>
            <Form.Control
              type='file'
              name='image'
              className='form-control'
              onChange={uploadImage}
            />
            <div className='d-flex justify-content-around flex-wrap'>
              {loading ? (
                <Loader />
              ) : (
                <Image
                  src={userData?.image}
                  alt={userData?.name}
                  className='mt-3 rounded mx-auto d-block'
                  style={{ width: "25%" }}
                />
              )}
            </div>
          </Col>
          <Col md={12} className='mt-4 mb-5'>
            <Button type='submit' className='w-100' disabled={loading}>
              {loading ? (
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                <span>update</span>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
