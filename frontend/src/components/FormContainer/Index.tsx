import React from "react";
import { Container, Row, Col } from "react-bootstrap";

type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const FormContainer = ({ children , className}: FormContainerProps) => {
  return (
    <Container className={className}>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
