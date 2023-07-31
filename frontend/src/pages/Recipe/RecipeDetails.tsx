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
  Image,
} from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

import { formatDate } from "../../utils";
import {
  addReview,
  deleteRecipe,
  deleteReview,
  getSavedRecipes,
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

  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes, ownRecipes } = useAppSelector((state) => state.recipe);

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

  useEffect(() => {
    dispatch(getSingleRecipe(recipeId as string));
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
    }
  }, [dispatch, recipeId, token, userID]);

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

  const handleDeleteComment = (recipeId: string, reviewId: string) => {
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
      <Row>
        <Col lg={8}>
          <div className='article'>
            <div className='flexy'>
              <h2>{recipe?.name}</h2>
              {recipe?.owner?._id === userID && (
                <div>
                  <Link
                    to={`/update-recipe/${recipe?._id}`}
                    className='btn btn-outline-primary btn-sm mx-2'
                  >
                    <AiOutlineEdit />
                    Edit
                  </Link>

                  <Button
                    onClick={handleConfirmDelete}
                    variant='outline-danger'
                    size='sm'
                  >
                    <BsTrash />
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <h6>
              {recipe?.category?.name
                ? recipe?.category?.name
                : "Category not available"}
            </h6>

            <Image
              src={recipe?.image}
              alt={recipe?.name}
              className='w-100 h-100'
            />
            {!user ? (
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Login to save recipe</Tooltip>}
              >
                <Button variant='primary w-100 mt-2 mb-5'>
                  <GoBookmark style={{ fontSize: "1.2rem" }} />
                </Button>
              </OverlayTrigger>
            ) : (
              <>
                {recipesIDs?.includes(recipe?._id as string) ? (
                  <Button
                    variant='secondary w-25 mt-2 mb-5'
                    size='sm'
                    style={{ fontSize: "1.2rem" }}
                    onClick={() => handleUnsaveRecipe(recipe?._id as string)}
                  >
                    <GoBookmarkFill className='h-5 w-5 cursor-pointer' />
                    unsave{" "}
                  </Button>
                ) : (
                  <Button
                    variant='primary w-25 mt-2 mb-5'
                    size='sm'
                    style={{ fontSize: "1.2rem" }}
                    onClick={() => handleSaveRecipe(recipe?._id as string)}
                  >
                    <GoBookmark className='h-5 w-5 cursor-pointer' />
                    save{" "}
                  </Button>
                )}
              </>
            )}
          </div>

          <Tabs defaultActiveKey='ingredients' className='mb-3' justify>
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
            <Tab eventKey='instructions' title='instructions'>
              <span
                className='m-5'
                dangerouslySetInnerHTML={{
                  __html: recipe?.instructions as string,
                }}
              />
            </Tab>
          </Tabs>
        </Col>

        <Col className='recipe-aside'>
          {/* Author */}
          <div className='widget widget-author'>
            <div className='widget-title'>
              <h3>Hello, I'm {recipe?.owner?.name}</h3>
            </div>
            <div className='widget-body'>
              <Link to={`/profile/${guestID}`}>
                <img
                  src={recipe?.owner?.image}
                  alt={recipe?.owner?.name}
                  className='w-25 h-25'
                />
              </Link>
              <Button
                variant='info'
                size='sm'
                onClick={() => navigate(`/profile/${guestID}`)}
              >
                View Profile
              </Button>
            </div>
          </div>

          {/* Author Recipes */}
          <div className='widget widget-post'>
            <div className='widget-title'>
              <h3>More Recipes by {recipe?.owner?.name} </h3>
            </div>
            <div className='widget-body'>
              {!ownRecipes.length ? (
                <p>{recipe?.owner?.name} has no other recipes</p>
              ) : (
                <div className='d-flex flex-wrap'>
                  {ownRecipes?.map((rec, index) => (
                    <Image
                      src={rec.image}
                      alt='recipe'
                      rounded
                      className='w-25 m-1'
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
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
                                  handleDeleteComment(
                                    recipe_Id as string,
                                    review._id as string
                                  )
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
                                handleDeleteComment(
                                  recipe_Id as string,
                                  review._id as string
                                )
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
                    Submit
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
