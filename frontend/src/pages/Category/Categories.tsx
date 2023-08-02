import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

import { capitalize } from "../../utils";
import Loader from "../../components/Loader/Index";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getAllCategories } from "../../redux/feature/Category/categorySlice";

import "./categoryStyle.css";

const Categories = () => {
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Container>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8'>
        <div className='px-4 my-5 text-center'>
          <h1 className='display-5 fw-bold'> Categories</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead'>
              Browse through our categories to find your favorite recipe.
            </p>
          </div>
        </div>
        {categories?.length === 0 && (
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl text-gray-500'>No categories found</h1>
          </div>
        )}
        {isLoading && <Loader />}
        <Row>
          {categories?.map((category) => (
            <Col xs={12} md={6} lg={4} className='mb-4 ' key={category._id}>
              <div>
                <Link
                  to={`/category/${category.slug}`}
                  className=' text-center category__link'
                >
                  <div className='category__img shadow'>
                    <Image
                      src={category.image}
                      rounded
                      className='img-fluid'
                      loading='lazy'
                    />
                  </div>
                  <h4 className='pt-1'>
                    {" "}
                    {capitalize(category.slug as string)}
                  </h4>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Categories;
