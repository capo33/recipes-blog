import { Col, Row } from "react-bootstrap";

import food from "../../assets/images/hero-image.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Row className='mb-4 flex-lg-row-reverse align-items-center py-4 mb-4'>
      <Col sm={12} lg={6} className='mb-4'>
        <img
          src={food}
          width={607}
          height={510}
          className='d-block mx-lg-auto img-fluid'
          loading='lazy'
          alt='Cooking With Node.js'
        />
      </Col>
      <Col lg={6} md={12}>
        <h1 className='display-5 fw-bold mb-3'>
          Huge selection of delicios recipe ideas
        </h1>
        <p className='lead'>
          Explore our huge selection of delicious recipe ideas including; easy
          desserts, delicious vegan and vegetarian dinner ideas, gorgeous pasta
          recipes, quick bakes, family-friendly meals and gluten-free recipes.
        </p>
        <Col lg={12} md={12} sm={12} className='gap-2'>
          <Link
            to='/explore-latest'
            className='btn btn-primary btn-dark btn-lg px-4 me-md-2 mb-2  w-100'
          >
            Explore Latest
          </Link>
          <Link
            to='/explore-random'
            className='btn btn-outline-secondary btn-lg px-4 me-md-2 mb-2 w-100'
          >
            Show Random
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default Hero;
