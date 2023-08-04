import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Col, Container, Table, Row } from "react-bootstrap";

import {
  deleteCategory,
  getAllCategories,
} from "../../../redux/feature/Category/categorySlice";
import { useAppSelector, useAppDispatch } from "../../../redux/app/store";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
const AllCategoriesForAdmin = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);

  const token = user?.token as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Capitalize
  const capitalize = (str: string) => {
    return str.charAt(0)?.toUpperCase() + str.slice(1);
  };

  // Delete Category
  const handleDeleteCategory = (id: string) => {
    console.log(id);

    dispatch(
      deleteCategory({
        id,
        token,
        toast,
      })
    );
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>All Categories for Admin</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>Edit or delete categories for your recipe.</p>
        </div>
      </div>
      {/* Add Category */}
      <Row className='mb-3'>
        <Col md={12}>
          <Link to='/admin/add-category' className='btn btn-primary'>
            Add Category
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Table striped variant='success' bordered hover responsive>
            <thead>
              <tr>
                <th>Category name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td className='border px-4 py-2'>
                    {capitalize(category.name)}
                  </td>
                  <td className='border px-4 py-2'>
                    <Link
                      to={`/admin/edit-category/${category.slug}`}
                      className='btn btn-outline-primary btn-sm mx-2'
                    >
                      <AiOutlineEdit className='h-5 w-5 mr-1' />
                      <span className='text-sm'>Edit</span>
                    </Link>
                  </td>
                  <td className='border px-4 py-2'>
                    <Button
                      onClick={() =>
                        handleDeleteCategory(category._id as string)
                      }
                      variant='outline-danger'
                      size='sm'
                    >
                      <AiFillDelete className='h-5 w-5 mr-1' />
                      Delete{" "}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllCategoriesForAdmin;
