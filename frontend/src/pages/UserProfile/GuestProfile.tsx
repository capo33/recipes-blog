import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";

import { formatDate } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
 import { getUserById } from "../../redux/feature/Auth/authSlice";

import "./style.css";

export const GuestProfile = () => {
  const { guestID } = useParams<{ guestID: string }>();

  const { guest } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById(guestID as string));
  }, [dispatch, guestID]);

  return (
    <Container>
      {/* Breadcrumb */}
      
      {/* /Breadcrumb */}
      <Row>
        <Col lg={4} md={12} className='mb-3'>
          {/* Card */}
          <Card>
            <Card.Body>
              <Card.Title className='text-center' as={"div"}>
                <Card.Img
                  alt={guest?.user?.name}
                  src={guest?.user?.image}
                  className='rounded-circl w-50'
                />
              </Card.Title>
              <Card.Title className='text-center'>
                {guest?.user?.name}
              </Card.Title>

              {/* Role */}
              <ListGroup>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Role</span>
                  {guest?.user?.role === "admin" ? (
                    <Badge bg='danger' className='py-1 px-2 mx-2'>
                      Admin
                    </Badge>
                  ) : (
                    <Badge bg='info' className='py-1 px-2 mx-2'>
                      User
                    </Badge>
                  )}
                </ListGroup.Item>

                {/* Title */}
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Title</span>
                  {guest?.recipes && guest?.recipes?.length > 5 ? (
                    <Badge bg='success' className='py-1 px-2 mx-2'>
                      Pro
                    </Badge>
                  ) : guest?.recipes && guest?.recipes?.length > 0 ? (
                    <Badge bg='warning' className='py-1 px-2 mx-2'>
                      Semi-Pro
                    </Badge>
                  ) : (
                    <Badge bg='danger' className='py-1 px-2 mx-2'>
                      Beginner
                    </Badge>
                  )}
                </ListGroup.Item>

                {/* Status */}
                <ListGroup.Item className='d-flex justify-content-between flex-wrap'>
                  <span>Status</span>
                  {guest?.recipes && guest?.recipes?.length > 0 ? (
                    <Badge bg='info' className='py-1 px-2 mx-2'>
                      Active
                    </Badge>
                  ) : (
                    <Badge bg='danger' className='py-1 px-2 mx-2'>
                      Inactive
                    </Badge>
                  )}
                </ListGroup.Item>

                {/* Member Since */}
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Member since:</span>
                  <Badge bg='info' className='py-1 px-2 mx-2'>
                    {formatDate(guest?.user?.createdAt)}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer className='d-flex justify-content-evenly'>
                <Button variant='primary' size='sm' className='w-50 mx-2'>
                  Edit
                </Button>
                <Button variant='danger' size='sm' className='w-50 mx-2'>
                  Delete
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>

          {/* Author Recipes Card */}
          <Card className='mt-3'>
            <Card.Body>
              <Card.Title className='text-center ' as={"h3"}>
                {guest?.user?.name}'s Recipes
                <span className='text-gray-500'>
                  ({guest?.recipes?.length})
                </span>
              </Card.Title>

              {guest?.recipes && guest?.recipes?.length > 0
                ? guest?.recipes?.map((recipe, index) => (
                    <div
                      className='d-flex justify-content-between align-items-center flex-wrap mt-2 p-2 border rounded '
                      key={index}
                    >
                      {recipe.name}
                      <Link to={`/recipe-details/${recipe._id}`}>
                        <Image
                          className=' rounded-full img-fluid'
                          style={{
                            width: 75,
                            height: 75,
                            objectFit: "cover",
                          }}
                          src={
                            recipe?.image
                              ? recipe?.image
                              : "https://via.placeholder.com/150"
                          }
                          alt='recipe'
                        />
                      </Link>
                    </div>
                  ))
                : "Not Available Yet"}
            </Card.Body>
          </Card>
        </Col>

        {/* Author Details */}
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Name</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.name}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Address</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.address
                    ? guest?.user?.address
                    : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Phone</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.phone
                    ? guest?.user?.phone
                    : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Birthday</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.birthday?.toString().slice(0, 10)}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Written recipes</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.recipes && guest?.recipes?.length > 0
                    ? guest?.recipes?.length + guest?.recipes?.length > 2
                      ? guest?.recipes?.length + " recipes"
                      : guest?.recipes?.length + " recipe"
                    : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Interests</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.interests && guest?.user?.interests?.length > 0
                    ? guest?.user?.interests?.map((interest, index) => (
                        <span key={index}>{interest}</span>
                      ))
                    : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Bio</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {guest?.user?.about
                    ? guest?.user?.about
                    : "Update your bio to tell more about yourself."}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
