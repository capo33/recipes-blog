import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Message from "../../components/Message/Index";
import { Recipe } from "../../interfaces/RecipeInterface";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getRandomRecipes } from "../../redux/feature/Recipe/recipeSlice";

const RandomRecipe = () => {
  const { randomRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomRecipes());
  }, [dispatch]);

  return (
    <Container>
       <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>
          Random Recipes
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            Get random recipes from our database.
          </p>
        </div>
      </div>
      <Row>
        {!randomRecipes?.length ? (
          <Message variant='info'>
            No recipes found. <Link to='/add-recipe'>Create Recipe</Link>
          </Message>
        ) : (
          <Row style={{ margin: "0 auto" }}>
            {randomRecipes?.map((recipe: Recipe) => (
              <Col key={recipe._id} sm={12} md={6} lg={4} xl={3}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default RandomRecipe