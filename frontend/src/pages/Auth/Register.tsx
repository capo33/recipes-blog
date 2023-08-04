import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthUser } from "../../interfaces/AuthInterface";
import { register } from "../../redux/feature/Auth/authSlice";
import FormContainer from "../../components/FormContainer/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";

const Register = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthUser>({
    name: "",
    email: "",
    password: "",
    answer: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = user?.token;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (token) {
      navigate(redirect);
    } else {
      navigate("/register");
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
    dispatch(register({ formData, toast, navigate }));
  };

  return (
    <FormContainer className='mt-5'>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineUser />
            </InputGroup.Text>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              placeholder='Enter name'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              type='email'
              name='email'
              value={formData.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        {/* Password */}
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineLock />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder='Enter password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        {/* Show Password */}
        <Form.Group
          controlId='showPassword'
          className='mt-1 d-flex justify-content-end'
        >
          <Form.Check
            type='switch'
            label='Show Password'
            onClick={handleClickShowPassword}
          />
        </Form.Group>

        {/* Security Question */}
        <Form.Group controlId='answer'>
          <Form.Label>
            What is your favorite color? (Security Question)
          </Form.Label>

          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineQuestionCircle />
            </InputGroup.Text>

            <Form.Control
              type='text'
              name='answer'
              value={formData.answer}
              placeholder='Enter answer'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-2'>
          Sign Up
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
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Already have an account? Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
