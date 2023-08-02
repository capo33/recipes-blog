import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

import {
  getUserById,
  updateUserProfileByAdmin,
} from "../../../redux/feature/Auth/authSlice";
import FormContainer from "../../../components/FormContainer/Index";
import { useAppDispatch, useAppSelector } from "../../../redux/app/store";

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { guest, user } = useAppSelector((state) => state.auth);

  interface IUpdateUserProfile {
    name: string;
    email: string;
    role: string;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  useEffect(() => {
    dispatch(getUserById(id as string));
  }, [id, dispatch]);

  useEffect(() => {
    setName(guest?.user?.name as string);
    setEmail(guest?.user?.email as string);
    setRole(guest?.user?.role as string);
  }, [guest]);

  // Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: IUpdateUserProfile = {
      name,
      email,
      role,
    };
    dispatch(
      updateUserProfileByAdmin({
        userId: id as string,
        userData,
        token,
        toast,
        navigate,
      })
    );
    console.log(userData);
  };

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        <FaArrowLeft /> Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {id}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={(name as string) || ""}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='mt-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter price'
              value={(email as string) || ""}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='role' className='mt-2'>
            <Form.Check
              type='checkbox'
              name='role'
              label={role}
              checked={role === "admin" ? true : false}
              value={(role as string) || ""}
              onChange={(e) => setRole(e.target.checked ? "admin" : "user")}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-2'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEdit;
