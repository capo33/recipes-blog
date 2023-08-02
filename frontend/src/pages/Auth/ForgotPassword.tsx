import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { SiAnswer } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useAppDispatch } from "../../redux/app/store";
import { IForgotPassword } from "../../interfaces/AuthInterface";
import FormContainer from "../../components/FormContainer/Index";
import { forgotPassword } from "../../redux/feature/Auth/authSlice";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<IForgotPassword>({
    email: "",
    answer: "",
    newPassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Show password toggle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      answer: "",
      newPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword({ formData, toast, navigate }));
    resetForm();
  };

  return (
    <FormContainer className='mt-5'>
      <h1 className='mb-1'>No Worries! We got you!</h1>
      <p>Do you remember your security answer? 😉</p>
      <Form onSubmit={handleSubmit}>
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

        {/* Answer */}
        <Form.Group controlId='answer'>
          <Form.Label>Security Answer</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <SiAnswer />
            </InputGroup.Text>
            <Form.Control
              type='text'
              name='answer'
              value={formData.answer}
              placeholder='Enter your security answer'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        {/* Password */}
        <Form.Group controlId='password'>
          <Form.Label>New Password</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name='newPassword'
              value={formData.newPassword}
              placeholder='Enter new password'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

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

        <Button type='submit' variant='primary' className='mt-2'>
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
