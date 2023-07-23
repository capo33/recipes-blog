import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
import { Review } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

import "./style.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recipe } = useAppSelector((state) => state.recipe);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

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
    dispatch(getSingleRecipe(id as string));
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
    }
  }, [dispatch, id, token, userID]);

  // Delete handler for recipe
  const handleDeleteBlog = async () => {
    dispatch(
      deleteRecipe({
        recipeID: recipe?._id as string,
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
  
  
  // Ingredients list
  const listOfIngredients = recipe?.ingredients?.map((ingredient) => (
    <div
      className='flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 border-l-teal-300 bg-gradient-to-r from-teal-100 to-transparent hover:from-teal-200'
      key={ingredient}
    >
      {ingredient}
    </div>
  ));

  // Tabs data
  const tabData = [
    {
      label: "Ingredients",
      value: "ingredients",
      // icon: ,
      desc: listOfIngredients ? listOfIngredients : "No Ingredients",
    },
    {
      label: "Instructions",
      value: "instructions",
      // icon: ,
      desc: recipe?.instructions ? recipe?.instructions : "No Instructions",
    },
  ];

  return (
    <div id='main-content' className='blog-page'>
      <div className='container'>
        <Link to='/' className='btn btn-primary'>
          Back to Home
        </Link>
        <div className='row clearfix'>
          <div className='col-lg-8 col-md-12 left-box'>
            <div className='card single_post'>
              <div className='body'>
                <div className='img-post'>
                  <img
                    className='d-block img-fluid'
                    src={recipe?.image as string}
                    alt='First slide'
                  />
                </div>
                {recipe?.likes?.includes(userID) ? (
            <>
              <Button
                variant='link'
                onClick={() => handleUnlike(recipe?._id as string)}
              >
                Unlike
                <AiFillLike />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='link'
                onClick={() => handleLike(recipe?._id as string)}
              >
                Like
                <AiOutlineLike />
              </Button>
            </>
          )}
                <h3>
                  <a href='blog-details.html'>All photographs are accurate</a>
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>Comments 3</h2>
              </div>
              <div className='body'>
                <ul className='comment-reply list-unstyled'>
                  <li className='row clearfix'>
                    <div className='icon-box col-md-2 col-4'>
                      <img
                        className='img-fluid img-thumbnail'
                        src='https://bootdey.com/img/Content/avatar/avatar7.png'
                        alt='Awesome Image'
                      />
                    </div>
                    <div className='text-box col-md-10 col-8 p-l-0 p-r0'>
                      <h5 className='m-b-0'>Gigi Hadid </h5>
                      <p>
                        Why are there so many tutorials on how to decouple
                        WordPress? how fast and easy it is to get it running
                        (and keep it running!) and its massive ecosystem.{" "}
                      </p>
                      <ul className='list-inline'>
                        <li>
                          <a href='javascript:void(0);'>Mar 09 2018</a>
                        </li>
                        <li>
                          <a href='javascript:void(0);'>Reply</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className='row clearfix'>
                    <div className='icon-box col-md-2 col-4'>
                      <img
                        className='img-fluid img-thumbnail'
                        src='https://bootdey.com/img/Content/avatar/avatar3.png'
                        alt='Awesome Image'
                      />
                    </div>
                    <div className='text-box col-md-10 col-8 p-l-0 p-r0'>
                      <h5 className='m-b-0'>Christian Louboutin</h5>
                      <p>
                        Great tutorial but few issues with it? If i try open
                        post i get following errors. Please can you help me?
                      </p>
                      <ul className='list-inline'>
                        <li>
                          <a href='javascript:void(0);'>Mar 12 2018</a>
                        </li>
                        <li>
                          <a href='javascript:void(0);'>Reply</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className='row clearfix'>
                    <div className='icon-box col-md-2 col-4'>
                      <img
                        className='img-fluid img-thumbnail'
                        src='https://bootdey.com/img/Content/avatar/avatar4.png'
                        alt='Awesome Image'
                      />
                    </div>
                    <div className='text-box col-md-10 col-8 p-l-0 p-r0'>
                      <h5 className='m-b-0'>Kendall Jenner</h5>
                      <p>
                        Very nice and informative article. In all the years I've
                        done small and side-projects as a freelancer, I've ran
                        into a few problems here and there.
                      </p>
                      <ul className='list-inline'>
                        <li>
                          <a href='javascript:void(0);'>Mar 20 2018</a>
                        </li>
                        <li>
                          <a href='javascript:void(0);'>Reply</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>
                  Leave a reply{" "}
                  <small>
                    Your email address will not be published. Required fields
                    are marked*
                  </small>
                </h2>
              </div>
              <div className='body'>
                <div className='comment-form'>
                  <form className='row clearfix'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Your Name'
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Email Address'
                        />
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <textarea
                          rows={4}
                          className='form-control no-resize'
                          placeholder='Please type what you want...'
                          defaultValue={""}
                        />
                      </div>
                      <button
                        type='submit'
                        className='btn btn-block btn-primary'
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-12 right-box'>
            <div className='card'>
              <div className='body search'>
                <div className='input-group m-b-0'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fa fa-search' />
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search...'
                  />
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>Categories Clouds</h2>
              </div>
              <div className='body widget'>
                <ul className='list-unstyled categories-clouds m-b-0'>
                  <li>
                    <a href='javascript:void(0);'>eCommerce</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Microsoft Technologies</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Creative UX</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Wordpress</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Angular JS</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Enterprise Mobility</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Website Design</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>HTML5</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Infographics</a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>Wordpress Development</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>Popular Posts</h2>
              </div>
              <div className='body widget popular-post'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='single_post'>
                      <p className='m-b-0'>Apple Introduces Search Ads Basic</p>
                      <span>jun 22, 2018</span>
                      <div className='img-post'>
                        <img
                          src='https://www.bootdey.com/image/280x280/87CEFA/000000'
                          alt='Awesome Image'
                        />
                      </div>
                    </div>
                    <div className='single_post'>
                      <p className='m-b-0'>new rules, more cars, more races</p>
                      <span>jun 8, 2018</span>
                      <div className='img-post'>
                        <img
                          src='https://www.bootdey.com/image/280x280/87CEFA/000000'
                          alt='Awesome Image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>Instagram Post</h2>
              </div>
              <div className='body widget'>
                <ul className='list-unstyled instagram-plugin m-b-0'>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                  <li>
                    <a href='javascript:void(0);'>
                      <img
                        src='https://www.bootdey.com/image/100x100/87CEFA/000000'
                        alt='image description'
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>
                  Email Newsletter{" "}
                  <small>
                    Get our products/news earlier than others, let’s get in
                    touch.
                  </small>
                </h2>
              </div>
              <div className='body widget newsletter'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Email'
                  />
                  <div className='input-group-append'>
                    <span className='input-group-text'>
                      <i className='icon-paper-plane' />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
