import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

import { capitalize } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getCategoryBySlug } from "../../redux/feature/Category/categorySlice";

const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const { category } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryBySlug(slug as string));
  }, [dispatch, slug]);

  return (
    <Container>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8'>
        <div className='px-4 my-5 text-center'>
          <h1 className='display-5 fw-bold'>
            {capitalize(category?.name as string)}
          </h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead'>
              All recipes in this category: {category?.recipes?.length}
            </p>
          </div>
        </div>

        <Row>
          {category?.recipes?.map((recipe) => (
            <Col xs={12} md={6} lg={4} className='mb-4' key={recipe?._id}>
              <Link to={`/recipe-details/${recipe?._id}`} className=''>
                <Image src={recipe?.image} rounded className='w-100 mx-auto' />
              </Link>
              <h3 className='text-2xl font-bold text-center'>{recipe?.name}</h3>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default CategoryDetails;
