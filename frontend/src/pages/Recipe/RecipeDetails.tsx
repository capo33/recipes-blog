import React, { useState, useEffect } from "react";
import { Button, Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Image from "react-bootstrap/Image";
import {
  addReview,
  deleteRecipe,
  deleteReview,
  getSavedRecipes,
  getSingleRecipe,
  likeRecipe,
  saveRecipe,
  unlikeRecipe,
  unsaveRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Review } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

import "./style.css";
import { AiFillLike, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { formatDate } from "../../utils";
import { Rating } from "../../components/Rating/Index";
import Message from "../../components/Message/Index";
import ModalPopup from "../../components/Modal/Index";
import { BsTrash } from "react-icons/bs";

const RecipeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes, ownRecipes } = useAppSelector((state) => state.recipe);

  const [show, setShow] = React.useState(false);
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
  const handleDeleteBlog = async () => {
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

  const handleDeleteComment = (recipeID: string, reviewID: string) => {
    dispatch(
      deleteReview({
        recipeID: recipe_Id,
        reviewID,
        token,
        toast,
      })
    );
  };

  // Like Recipe
  const handleLike = async (id: string) => {
    dispatch(likeRecipe({ recipeId: id, userId: userID, token }));
  };

  // Unlike Recipe
  const handleUnlike = async (id: string) => {
    dispatch(unlikeRecipe({ recipeId: id, userId: userID, token }));
  };

  const deleteRecipeHandler = (id: string) => {
    dispatch(deleteRecipe({ recipeId: id, token, navigate, toast }));
  };

  return (
    <div className=' '>
      <Container>
        {showModal ? (
          <ModalPopup
            showModal={showModal}
            setShowModal={setShowModal}
            handleDelete={handleDeleteBlog}
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
                      className='btn btn-primary btn-sm mx-2'
                    >
                      <AiOutlineEdit />
                      Edit
                    </Link>

                    <button
                      onClick={handleConfirmDelete}
                      className='btn btn-danger btn-sm'
                    >
                      <BsTrash />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <h6>{recipe?.category?.name}</h6>

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
                  <Button variant='primary w-100'>
                    <GoBookmark style={{ fontSize: "1.2rem" }} />
                  </Button>
                </OverlayTrigger>
              ) : (
                <>
                  {recipesIDs?.includes(recipe?._id as string) ? (
                    <Button
                      variant='secondary w-100 mt-2'
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => handleUnsaveRecipe(recipe?._id as string)}
                    >
                      <GoBookmarkFill className='h-5 w-5 cursor-pointer' />
                      unsave{" "}
                    </Button>
                  ) : (
                    <Button
                      variant='primary w-100 mt-2'
                      style={{ fontSize: "1.5rem" }}
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
          <Col className='blog-aside'>
            {/* Author */}
            <div className='widget widget-author'>
              <div className='widget-title'>
                <h3>Hello, I'm {recipe?.owner?.name}</h3>
              </div>
              <div className='widget-body'>
                <Link to={`/profile/${guestID}`}>
                  <img
                    src={recipe?.owner?.image}
                    alt=''
                    className='w-25 h-25'
                  />
                </Link>
                <Button
                  variant='outline-primary'
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
              {/* <div className='widget-body'>
                {ownRecipes &&
                  ownRecipes?.map((rec, index) => (
                    <Image
                      src={rec.image}
                      alt='recipe'
                      rounded
                      className='w-25 m-1'
                      key={index}
                    />
                  ))}
              </div> */}
            </div>
          </Col>

          {/* Comments */}
          <Row className='review my-3'>
            <Col lg={8} md={12}>
              <h2>Reviews</h2>
              {recipe && recipe?.reviews?.length === 0 && (
                <Message variant='success'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {recipe &&
                  recipe?.reviews?.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review?.rating} />
                      <p>{formatDate(review.createdAt)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {user ? (
                  <Form>
                    <Form.Group controlId='rating' className='my-2'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        // value={rating}
                        // onChange={(e) => setRating(Number(e.target.value))}
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
                        // value={comment}
                        // onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      // disabled={isReviewLoading}
                      type='submit'
                      variant='primary'
                    >
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
    </div>
  );
};

export default RecipeDetails;
