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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestRecipes());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {!latestRecipes?.length ? (
          <Message variant='info'>
            No recipes found. <Link to='/add-recipe'>Create Recipe</Link>
          </Message>
        ) : (
          <Row style={{ margin: "0 auto" }}>
            {latestRecipes?.map((recipe: Recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
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
