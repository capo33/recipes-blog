import { Col, Container, Row } from "react-bootstrap";

import food from "../../assets/images/hero-image.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container>
      <Row className='flex-lg-row-reverse align-items-center g-5 py-5'>
        <Col sm={12} lg={6} className='mb-4'>
          <img
            src={food}
            width={607}
            height={510}
            className='d-block mx-lg-auto img-fluid'
            loading='lazy'
            alt='Eating food'
          />
        </Col>
        <Col lg={6}>
          <h1 className='display-5 fw-bold lh-1 mb-3'>
            Huge selection of delicios recipe ideas
          </h1>
          <p className='lead'>
            Explore our huge selection of delicious recipe ideas including; easy
            desserts, delicious vegan and vegetarian dinner ideas, gorgeous
            pasta recipes, quick bakes, family-friendly meals and gluten-free
            recipes.
          </p>
          <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
            <Link to='/random' className='btn btn-primary btn-lg px-4'>
              Random Recipe
            </Link>
            <Link
              to='/latest'
              className='btn btn-outline-secondary btn-lg px-4'
            >
              Latest Recipe
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
