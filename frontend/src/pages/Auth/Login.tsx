import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthUser } from "../../interfaces/AuthInterface";
import { login } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import FormContainer from "../../components/FormContainer/Index";

const Login = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthUser>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = user?.token;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Redirect user to home page if user is already logged in
  useEffect(() => {
    if (token) {
      navigate(redirect);
    } else {
      navigate("/login");
    }
  }, [token, navigate, redirect]);

  // Show password toggle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Change input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ formData, toast, navigate }));
  };

  return (
    <FormContainer className='mt-5'>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            placeholder='Enter email'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder='Enter password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='showPassword' className='mt-1 d-flex justify-content-end'>
          <Form.Check
            type='switch'
            label='Show Password'
            onClick={handleClickShowPassword}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-2'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col lg={12}>
          <Link
            to={redirect ? `/forgot-password?redirect=${redirect}` : "/login"}
          >
            Forgot Password
          </Link>
        </Col>
        <Col lg={12}>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Don't have an account? Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
