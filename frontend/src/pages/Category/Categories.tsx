import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";
import { Col, Container, Image, Row } from "react-bootstrap";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);
console.log(categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const capitalize = (str: string) => {
    return str.charAt(0)?.toUpperCase() + str.slice(1);
  };

  return (
    <section className='bg-white container px-6 py-10 mx-auto'>
      <h2 className='text-center mb-5 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
        Categories
      </h2>
      {/* <BackLink link='/' name='Back to home' /> */}
      {isLoading && <div>Loading...</div>}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8'>
        {categories?.length === 0 && (
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl text-gray-500'>No categories found</h1>
          </div>
        )}
        <Container>
          <Row>
            {categories?.map((category) => (
              <>
                <Col xs={6} md={4}>
                  <Image src={category.image} rounded />
                  <p>
                    {category.slug}
                  </p>
                  <Link
                    to={`/category/${category.slug}`}
                    className='text-white text-2xl font-bold text-center'
                  >
                    <span className='absolute inset-0' />
                    {capitalize(category.name)}
                  </Link>

                </Col>
 

                {/* <div
              key={category._id}
              className='relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out'
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            >
              <div className='absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out' />
              <div className='relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center'>
                <h3 className='text-center'>
                  <Link
                    to={`/category/${category.slug}`}
                    className='text-white text-2xl font-bold text-center'
                  >
                    <span className='absolute inset-0' />
                    {capitalize(category.name)}
                  </Link>
                </h3>
                </div>
            </div> */}
              </>
            ))}
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Categories;
