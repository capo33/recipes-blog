import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Message from "../../components/Message/Index";
import { Recipe } from "../../interfaces/RecipeInterface";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getLatestRecipes } from "../../redux/feature/Recipe/recipeSlice";

const LatestRecipe = () => {
  const { latestRecipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestRecipes());
  }, [dispatch]);

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Latest Recipes</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>Get latest recipes from our database.</p>
        </div>
      </div>
      <Row>
        {!latestRecipes?.length ? (
          user ? (
            <Message variant='info'>
              No recipes found. <Link to='/add-recipe'>Create Recipe</Link>
            </Message>
          ) : (
            <Message variant='info'>
              No recipes found. <Link to='/login'>Login</Link> to create recipe.
            </Message>
          )
        ) : (
          <Row style={{ margin: "0 auto" }}>
            {latestRecipes?.map((recipe: Recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4}>
              <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default LatestRecipe;
