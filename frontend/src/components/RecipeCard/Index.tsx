import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Visibility,
  ThumbUpAlt,
  ThumbUpOffAlt,
  MessageOutlined,
  StarBorder,
} from "@mui/icons-material";

import {
  getSavedRecipes,
  likeRecipe,
  unlikeRecipe,
} from "../../redux/feature/Recipe/recipeSlice";
import { formatDate, subStringFunc } from "../../utils";
import { Recipe } from "../../interfaces/RecipeInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeReviewCard = ({ recipe }: RecipeCardProps) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={recipe?.owner?.image} />}
        title={recipe?.name}
        subheader={formatDate(recipe?.createdAt)}
        action={
          <IconButton aria-label='settings'>
            {!user ? (
              <Tooltip title='Login to like recipes' placement='top'>
                <ThumbUpOffAlt />
              </Tooltip>
            ) : recipe?.likes?.includes(userID) ? (
              <ThumbUpAlt
                style={{ cursor: "pointer" }}
                onClick={() => handleUnlike(recipe?._id as string)}
              />
            ) : (
              <ThumbUpOffAlt
                style={{ cursor: "pointer" }}
                onClick={() => handleLike(recipe?._id as string)}
              />
            )}
          </IconButton>
        }
      />
      <Typography
        variant='h6'
        noWrap
        component={Link}
        to={`/recipe-details/${recipe?._id}`}
        sx={{ textDecoration: "none", color: "black" }}
      >
        <CardMedia
          component='img'
          height='194'
          image={recipe?.image}
          alt='Paella dish'
        />
      </Typography>
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          <span
            dangerouslySetInnerHTML={{
              __html: subStringFunc(recipe?.instructions, 25),
            }}
          />
          {recipesIDs?.includes(recipe._id) ? (
            <Chip label='Saved' color='success' size='small' />
          ) : (
            <Chip label='Not Saved' color='error' size='small' />
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0px auto",
          }}
        >
          {/* Likes Tooltip */}
          <Grid item xs={3}>
            <Tooltip
              title={`${recipe?.likes?.length} ${
                recipe?.likes?.length === 1 ? "like" : "likes"
              }`}
              placement='top'
            >
              <IconButton aria-label='view recipe'>
                <ThumbUpAlt />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* Views Tooltip */}
          <Grid item xs={3}>
            <Tooltip
              title={`${recipe?.views} ${
                recipe?.views === 1 ? "view" : "views"
              }`}
              placement='top'
            >
              <IconButton aria-label='view recipe'>
                <Visibility />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* Comments Tooltip */}
          <Grid item xs={3}>
            <Tooltip
              title={`${recipe?.reviews?.length} ${
                recipe?.reviews?.length === 1 ? "reviews" : "review"
              }`}
              placement='top'
            >
              <IconButton aria-label='view recipe'>
                <MessageOutlined />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* Rate Tooltip */}
          <Grid item xs={3}>
            <Tooltip
              title={`${recipe?.rating} ${
                recipe?.rating === 1 ? "star" : "stars"
              }`}
              placement='top'
            >
              <IconButton aria-label='comment'>
                <StarBorder />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
