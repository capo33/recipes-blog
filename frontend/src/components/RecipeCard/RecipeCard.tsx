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

  return (
    <Card className='my-3 rounded '>
      {/* Card Body */}
      <Card.Body>
        {/* Card Header */}
        <Card.Text as='div' className='d-flex justify-content-between  '>
          <Card.Title as={"h5"}>{recipe?.name}</Card.Title>
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
          </Card.Title>
        </Card.Text>
        <Card.Text as='div' className='d-flex justify-content-between  '>
          <Card.Title as={"p"}>{formatDate(recipe?.createdAt)}</Card.Title>
          <Card.Title as={"p"}>
            <Badge>{recipe?.category?.name}</Badge>
          </Card.Title>
        </Card.Text>
        <Link to={`/recipe-details/${recipe._id}`}>
          <Card.Img
            src={recipe.image}
            variant='top'
            alt={recipe.name}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
            }}
          />
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
            <Button
              variant='light'
              className='btn btn-outline-primary d-flex justify-content-center align-items-center'
            >
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
            <Button
              variant='light'
              className='btn btn-outline-primary d-flex justify-content-center align-items-center'
            >
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
            <Button
              variant='light'
              className='btn btn-outline-primary d-flex justify-content-center align-items-center'
            >
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
            <Button
              variant='light'
              className='btn btn-outline-primary d-flex justify-content-center align-items-center'
            >
              <AiOutlineStar />
            </Button>
          </OverlayTrigger>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
