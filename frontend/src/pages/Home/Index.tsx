import { useEffect } from "react";
import { Grid, Container } from "@mui/material";

import Hero from "./Hero";
import { Recipe } from "../../interfaces/RecipeInterface";
import RecipeReviewCard from "../../components/RecipeCard/Index";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <Container>
      <Hero />
      <Grid container spacing={2} sx={{ m: "0 auto" }}>
        {recipes?.length === 0 && (
          <p>No recipes found. Please create a recipe.</p>
        )}
        {recipes?.map((recipe: Recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <RecipeReviewCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
