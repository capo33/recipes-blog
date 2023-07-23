import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { formatDate, subStringFunc } from "../../utils";
import { Recipe } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { useEffect } from "react";
import {
  getAllRecipes,
  getSavedRecipes,
  likeRecipe,
  unlikeRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineEye,
  AiOutlineStar,
} from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;
  const userID = user?._id as string;

  const recipesIDs = savedRecipes?.map((recipe) => recipe._id);

  // Like Recipe
  const handleLike = async (id: string) => {
    dispatch(likeRecipe({ recipeId: id, userId: userID, token }));
  };
 
  // Unlike Recipe
  const handleUnlike = async (id: string) => {
    dispatch(unlikeRecipe({ recipeId: id, userId: userID, token }));
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getSavedRecipes({ token, userID }));
  }, [dispatch, token, userID]);

  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Text as='div' className='d-flex justify-content-between'>
        <Card.Title className=''>{recipe?.name}</Card.Title>
        <Card.Subtitle className='text-muted '>
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
        </Card.Subtitle>
      </Card.Text>
      <Card.Subtitle className='text-muted '>
        {recipe?.category?.name}
      </Card.Subtitle>
      <Link to={`/recipe-details/${recipe._id}`}>
        <Card.Img src={recipe.image} variant='top' />
      </Link>

      <Card.Body>
        <Card.Text
          as='div'
          dangerouslySetInnerHTML={{
            __html: subStringFunc(recipe?.instructions, 30),
          }}
        />
        <Card.Text as='div' className='d-flex justify-content-between'>
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
