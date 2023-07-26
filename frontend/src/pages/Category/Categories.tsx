import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import { Col, Container, Image, Row } from "react-bootstrap";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const capitalize = (str: string) => {
    return str.charAt(0)?.toUpperCase() + str.slice(1);
  };

  return (
    <Container className='px-5'>
      {/* <BackLink link='/' name='Back to home' /> */}
      {isLoading && <div>Loading...</div>}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8'>
        {categories?.length === 0 && (
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl text-gray-500'>No categories found</h1>
          </div>
        )}
        <div className='px-4 my-5 text-center'>
          <h1 className='display-5 fw-bold'> Categories</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead'>
              Browse through our categories to find your favorite recipe.
            </p>
          </div>
        </div>
        <Row>
          {categories?.map((category) => (
            <Col xs={12} md={6} lg={4} className='mb-4' key={category._id}>
              <Link to={`/category/${category.slug}`} className=''>
                <Image src={category.image} rounded className='w-100 mx-auto' />
              </Link>
              <h3 className='text-2xl font-bold text-center'>
                {category.slug}
              </h3>
              <Link
                to={`/category/${category.slug}`}
                className='text-white text-2xl font-bold text-center'
              >
                <span className='absolute inset-0' />
                {capitalize(category.name)}
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Categories;
