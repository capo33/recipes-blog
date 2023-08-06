import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Form,
  Tooltip,
  Tab,
  Tabs,
  OverlayTrigger,
  Badge,
  Card,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

import { formatDate } from "../../utils";
import {
  addReview,
  deleteRecipe,
  deleteReview,
  getSingleRecipe,
  saveRecipe,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import Message from "../../components/Message/Index";
import ModalPopup from "../../components/Modal/Index";
import { Rating } from "../../components/Rating/Index";
import { Review } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

import "./style.css";

const RecipeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe, savedRecipes } = useAppSelector((state) => state.recipe);

  const [show, setShow] = useState(false);
  const [data, setData] = useState<Review>({
    rating: 0,
    comment: "",
  });

  const userID = user?._id as string;
  const token = user?.token as string;
  const recipe_Id = recipe?._id as string;
  const guestID = recipe?.owner?._id as string;
  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Loading state
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    }

    if (loading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getSingleRecipe(recipeId as string));
  }, [dispatch, recipeId, userID]);

  // Delete handler for recipe
  const handleDeleteRecipe = async () => {
    dispatch(
      deleteRecipe({
        recipeId: recipe?._id as string,
        token,
        navigate,
        toast,
      })
    );
  };

  // Delete handler for recipe
  const handleConfirmDelete = () => {
    setShowModal((prev) => !prev);
  };

  // Save Recipe
  const handleSaveRecipe = (recipeID: string) => {
    setLoading(true);
    dispatch(
      saveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  // Unsave Recipe
  const handleUnsaveRecipe = (recipeID: string) => {
    setLoading(true);
    dispatch(
      unsaveRecipe({
        recipeID,
        userID,
        token,
      })
    );
  };

  // Submit handler for review
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addReview({
        recipeID: recipe?._id as string,
        formData: data,
        token,
        toast,
      })
    );
    setData({
      rating: 0,
      comment: "",
    });
  };

  //  Show and hide comments
  const toggleComment = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // Delete handler for comment
  const handleDeleteComment = (reviewId: string) => {
    dispatch(
      deleteReview({
        recipeId: recipe_Id,
        reviewId,
        token,
        toast,
      })
    );
  };

  return (
    <Container>
      {showModal ? (
        <ModalPopup
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDeleteRecipe}
          value='recipe'
        />
      ) : null}
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Recipe Details</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>Let's get cooking today</p>
        </div>
      </div>
      <Row>
        <Col lg={8} className='mt-3'>
          <Card className='mb-3'>
            <Card.Header className='mt-2 mx-2'>
              <Row>
                <Col md={8}>
                  <Card.Title as={"h3"}>{recipe?.name}</Card.Title>
                </Col>
                <Col md={4}>
                  <div className=' '>
                    {/* Save & Unsave */}
                    {!user ? (
                      <OverlayTrigger
                        placement='top'
                        overlay={<Tooltip>Login to save recipe</Tooltip>}
                      >
                        <Button
                          variant='primary w-100'
                          style={{ fontSize: "1.2rem" }}
                          size='sm'
                        >
                          <GoBookmark style={{ fontSize: "1.2rem" }} /> Save
                        </Button>
                      </OverlayTrigger>
                    ) : (
                      <>
                        {recipesIDs?.includes(recipe?._id as string) ? (
                          <Button
                            variant='primary w-100'
                            style={{ fontSize: "1.2rem" }}
                            size='sm'
                            disabled={loading}
                            onClick={() =>
                              handleUnsaveRecipe(recipe?._id as string)
                            }
                          >
                            {loading ? (
                              <span className='spinner-border spinner-border-sm' />
                            ) : (
                              <span>
                                <GoBookmarkFill
                                  style={{ fontSize: "1.2rem" }}
                                />{" "}
                                Unsave
                              </span>
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant='primary w-100'
                            size='sm'
                            style={{ fontSize: "1.2rem" }}
                            disabled={loading}
                            onClick={() =>
                              handleSaveRecipe(recipe?._id as string)
                            }
                          >
                            {loading ? (
                              <span className='spinner-border spinner-border-sm' />
                            ) : (
                              <span>
                                <GoBookmark /> Save
                              </span>
                            )}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <Badge bg='info' className='px-3'>
                {recipe?.category?.name
                  ? recipe?.category?.name
                  : "Category not available"}
              </Badge>
            </Card.Header>

            {/* Card Body */}
            <Card.Body>
              <Card.Img
                src={recipe?.image}
                alt={recipe?.name}
                className='recipe_img img-fluid d-block mx-auto mt-3'
              />

              <Col className='mt-3'>
                <Tabs defaultActiveKey='ingredients' className='m-3' justify>
                  <Tab eventKey='ingredients' title='Ingredients'>
                    <ListGroup as='ol' numbered>
                      {recipe?.ingredients?.map((ingredient, index) => (
                        <ListGroup.Item
                          as={"li"}
                          key={index}
                          className='border-0 bg-transparent'
                        >
                          {ingredient}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                  <Tab
                    eventKey='instructions'
                    title='instructions'
                    className='mx-3'
                  >
                    <span
                      className='m-5'
                      dangerouslySetInnerHTML={{
                        __html: recipe?.instructions as string,
                      }}
                    />
                  </Tab>
                </Tabs>
              </Col>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className='m-3 d-flex justify-content-between'>
            <Card.Body>
              <Card.Title>Author: {recipe?.owner?.name}</Card.Title>
              <Card.Img
                src={recipe?.owner?.image}
                alt={recipe?.owner?.name}
                className='w-50 d-block mx-auto rounded-circle'
              />
              <Card.Text>
                <Link
                  to={
                    recipe?.owner?._id !== userID
                      ? `/user-profile/${guestID}`
                      : "/profile"
                  }
                  className='btn btn-info w-100 mt-3'
                >
                  View Profile
                </Link>
              </Card.Text>

              {/* Edit & Delete */}
              {recipe?.owner?._id === userID && (
                <Card.Title
                  as={"div"}
                  className='d-flex justify-content-between align-items-center mt-3 gap-2'
                >
                  <Link
                    to={`/update-recipe/${recipe?._id}`}
                    className='btn btn-primary w-100'
                  >
                    <AiOutlineEdit />
                    Edit
                  </Link>

                  <Button
                    onClick={handleConfirmDelete}
                    variant='danger'
                    className='w-100'
                  >
                    <BsTrash />
                    Delete
                  </Button>
                </Card.Title>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8} md={12}>
          <hr />
        </Col>

        {/* Comments & Reviews */}
        <Row className='my-3'>
          <Col lg={8} md={12}>
            <h3>Reviews</h3>
            {recipe?.reviews && recipe?.reviews?.length === 0 && (
              <Message variant='success'>No Reviews</Message>
            )}

            {/* Show and Hide Reviews */}
            {recipe?.reviews && recipe?.reviews?.length > 2 && (
              <>
                <div className=''>
                  {show ? (
                    <h6 className='mb-6' onClick={() => toggleComment()}>
                      <span className='cursor-pointer underline rounded '>
                        Hide Comments
                      </span>
                    </h6>
                  ) : (
                    <h6 className='mb-6' onClick={() => toggleComment()}>
                      <span className='cursor-pointer underline rounded'>
                        {recipe?.reviews?.length > 0
                          ? "Show All Comments"
                          : "No Comments Yet"}
                      </span>
                    </h6>
                  )}
                </div>
              </>
            )}

            {/* Show 2 Reviews */}
            {recipe?.reviews && recipe?.reviews?.length > 0 && !show && (
              <>
                {recipe &&
                  recipe?.reviews
                    ?.map((review) => (
                      <ListGroup
                        variant='info'
                        key={review._id}
                        className='my-2'
                      >
                        <ListGroup.Item>
                          <div className='d-flex justify-content-between'>
                            <strong>{review.name}</strong>
                            {review?.user === user?._id && (
                              <button
                                className='btn btn-outline-danger btn-sm '
                                onClick={() =>
                                  handleDeleteComment(review._id as string)
                                }
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <Rating value={review?.rating} />
                          <p>{formatDate(review.createdAt)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      </ListGroup>
                    ))
                    .slice(0, 2)}
              </>
            )}

            {/* Show All Reviews */}
            {show && recipe?.reviews && recipe?.reviews?.length > 0 && (
              <>
                {recipe &&
                  recipe?.reviews?.map((review) => (
                    <ListGroup variant='info' key={review._id} className='my-2'>
                      <ListGroup.Item>
                        <div className='d-flex justify-content-between'>
                          <strong>{review.name}</strong>
                          {review?.user === user?._id && (
                            <button
                              className='btn btn-outline-danger btn-sm '
                              onClick={() =>
                                handleDeleteComment(review._id as string)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <Rating value={review?.rating} />
                        <p>{formatDate(review.createdAt)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
              </>
            )}

            <ListGroup.Item>
              <h3 className='my-3'>Write a Customer Review</h3>
              {user ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='rating' className='my-2'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      required
                      value={data.rating}
                      onChange={(e) =>
                        setData({
                          ...data,
                          rating: Number(e.currentTarget.value),
                        })
                      }
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment' className='my-2'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={data.comment}
                      required
                      onChange={(e) =>
                        setData({
                          ...data,
                          comment: e.currentTarget.value as string,
                        })
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Add Review
                  </Button>
                </Form>
              ) : (
                <Message variant='warning'>
                  Please <Link to='/login'>sign in</Link> to write a review{" "}
                </Message>
              )}
            </ListGroup.Item>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default RecipeDetails;
