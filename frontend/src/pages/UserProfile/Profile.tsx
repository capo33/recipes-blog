import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
import {
  logout,
  userDeleteProfile,
  userProfile,
} from "../../redux/feature/Auth/authSlice";
import ModalPopup from "../../components/Modal/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  // const recipes = useAppSelector((state) => state.recipe);
  const { recipes } = useAppSelector((state) => state.recipe);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ownedRecipes = recipes?.filter(
    (recipe) => recipe?.owner?._id === user?._id
  );

  const token = user?.token as string;
  const userData = {
    name: user?.name,
    about: user?.about,
    phone: user?.phone,
    email: user?.email,
    ownedRecipes: ownedRecipes,
    image: user?.image,
    isAdmin: user?.role,
    address: user?.address,
    birthday: user?.birthday,
    interests: user?.interests,
    userId: user?._id,
    time: user?.createdAt,
  };

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  const handleDeleteProfile = () => {
    dispatch(logout());
    dispatch(userDeleteProfile({ token, toast, navigate }));
  };

  // Delete handler for recipe
  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
    console.log("Delete profile");
    console.log(showModal);
  };

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>
         My Profile
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Explore your recipes and profiles
          </p>
        </div>
      </div>
      {showModal ? (
        <ModalPopup
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDeleteProfile}
          value='profile'
        />
      ) : null}

      <Row>
        <Col lg={4} md={12} className='mb-3'>
          {/* Card */}
          <Card>
            <Card.Body>
              <Card.Title className='text-center' as={"div"}>
                <Card.Img
                  alt={userData?.name}
                  src={userData?.image}
                  className='rounded-circl w-50'
                />
              </Card.Title>
              <Card.Title className='text-center'>{userData?.name}</Card.Title>

              {/* Role */}
              <ListGroup>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Role</span>
                  {userData?.isAdmin === "admin" ? (
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
                  {userData?.ownedRecipes &&
                  userData?.ownedRecipes?.length > 5 ? (
                    <Badge bg='success' className='py-1 px-2 mx-2'>
                      Pro
                    </Badge>
                  ) : userData?.ownedRecipes &&
                    userData?.ownedRecipes?.length > 0 ? (
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
                  {userData?.ownedRecipes &&
                  userData?.ownedRecipes?.length > 0 ? (
                    <Badge bg='success' className='py-1 px-2 mx-2'>
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
                    {formatDate(userData?.time)}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer className='d-flex justify-content-evenly'>
                <Link
                  to={`/update-profile/${userData?.userId}`}
                  className='w-50 mx-2 btn btn-primary btn-sm'
                >
                  <span className='text-sm'>Edit</span>
                </Link>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={handleConfirmDelete}
                  className='w-50 mx-2'
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
          s{/* Author Recipes Card */}
          <Card className='mt-3'>
            <Card.Body>
              <Card.Title className='text-center ' as={"h3"}>
                {userData?.name}'s Recipes
                <span className='text-gray-500'>
                  ({userData?.ownedRecipes?.length})
                </span>
              </Card.Title>

              {userData?.ownedRecipes && userData?.ownedRecipes?.length > 0
                ? userData?.ownedRecipes?.map((recipe, index) => (
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
                  {userData?.name}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Address</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {userData?.address ? userData?.address : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Phone</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {userData?.phone ? userData?.phone : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Birthday</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {userData?.birthday?.toString().slice(0, 10)}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Written recipes</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {userData?.ownedRecipes && userData?.ownedRecipes?.length > 0
                    ? userData?.ownedRecipes?.length +
                        userData?.ownedRecipes?.length >
                      2
                      ? userData?.ownedRecipes?.length + " recipes"
                      : userData?.ownedRecipes?.length + " recipe"
                    : "Not Available Yet"}
                </Col>
              </Row>

              <hr />

              <Row>
                <Col sm={3}>
                  <h6 className='mb-0'>Interests</h6>
                </Col>
                <Col sm={9} className='text-secondary'>
                  {userData?.interests && userData?.interests?.length > 0
                    ? userData?.interests?.map((interest, index) => (
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
                  {userData?.about
                    ? userData?.about
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

export default Profile;
