import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiFillLike,
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineStar,
} from "react-icons/ai";
import Tooltip from "react-bootstrap/Tooltip";
import { FaRegComments } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { formatDate } from "../../utils";
import {
  getSavedRecipes,
  likeRecipe,
  unlikeRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { Recipe } from "../../interfaces/RecipeInterface";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const userID = user?._id as string;

  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  console.log("check ", recipesIDs?.includes(recipe._id));
  console.log("savedRecipes ", savedRecipes);
  console.log("recipesIDs ", recipesIDs);

  useEffect(() => {
    dispatch(getSavedRecipes({ userID, token }));
  }, [dispatch, token, userID]);

  // Like Recipe
  const handleLike = async (id: string) => {
    dispatch(likeRecipe({ recipeId: id, userId: userID, token }));
  };

  // Unlike Recipe
  const handleUnlike = async (id: string) => {
    dispatch(unlikeRecipe({ recipeId: id, userId: userID, token }));
  };

  // // Save Recipe
  // const handleSaveRecipe = (recipeID: string) => {
  //   dispatch(
  //     saveRecipe({
  //       recipeID,
  //       userID,
  //       token,
  //     })
  //   );
  // };

  // // Unsave Recipe
  // const handleUnsaveRecipe = (recipeID: string) => {
  //   dispatch(
  //     unsaveRecipe({
  //       recipeID,
  //       userID,
  //       token,
  //     })
  //   );
  // };

  return (
    <Card className='my-3 p-3 rounded'>
      {/* Card Body */}
      <Card.Body>
        {/* Card Header */}
        <Card.Text as='div' className='d-flex justify-content-between  '>
          <Card.Title as={"h4"}>{recipe?.name}</Card.Title>
          <Card.Title as={"h4"} className='d-flex align-items-center'>
            {recipe?.likes?.includes(userID) ? (
              <AiFillLike
                style={{ cursor: "pointer" }}
                onClick={() => handleUnlike(recipe?._id as string)}
              />
            ) : (
              <AiOutlineLike
                style={{ cursor: "pointer" }}
                onClick={() => handleLike(recipe?._id as string)}
              />
            )}
            {/* {recipesIDs?.includes(recipe?._id as string) ? (
              <FaBookmark
                style={{ cursor: "pointer" }}
                className='h-5 w-5 cursor-pointer'
                onClick={() => handleUnsaveRecipe(recipe?._id as string)}
              />
            ) : (
              <FaRegBookmark
                style={{ cursor: "pointer" }}
                onClick={() => handleSaveRecipe(recipe?._id as string)}
                className='h-5 w-5 cursor-pointer'
              />
            )} */}
          </Card.Title>
        </Card.Text>
        <Card.Title as={"p"}>{formatDate(recipe?.createdAt)}</Card.Title>

        <Link to={`/recipe-details/${recipe._id}`}>
          <Card.Img src={recipe.image} variant='top' alt={recipe.name} />
        </Link>

        <Card.Text as='div' className='mb-2 mt-2'>
          {recipesIDs?.includes(recipe._id) ? (
            <Badge bg='success'>Saved</Badge>
          ) : (
            <Badge bg='danger'>Unsaved</Badge>
          )}
        </Card.Text>
        {/* Tooltips */}
        <Card.Text as='div' className='d-flex justify-content-between'>
          {/* Likes Tooltip */}
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {`${recipe?.likes?.length} ${
                  recipe?.likes?.length === 1 ? "like" : "likes"
                }`}
              </Tooltip>
            }
          >
            <Button>
              <AiFillLike />
            </Button>
          </OverlayTrigger>

          {/* Vies Tooltip */}
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {`${recipe?.views} ${recipe?.views === 1 ? "view" : "views"}`}
              </Tooltip>
            }
          >
            <Button>
              <AiOutlineEye />
            </Button>
          </OverlayTrigger>

          {/* Reviews Tooltip */}
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {`${recipe?.reviews?.length} ${
                  recipe?.reviews?.length === 1 ? "reviews" : "review"
                }`}
              </Tooltip>
            }
          >
            <Button>
              <FaRegComments />
            </Button>
          </OverlayTrigger>

          {/* Rating Tooltip */}
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {`${recipe?.rating} ${recipe?.rating === 1 ? "star" : "stars"}`}
              </Tooltip>
            }
          >
            <Button>
              <AiOutlineStar />
            </Button>
          </OverlayTrigger>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
