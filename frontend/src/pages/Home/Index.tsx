import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Hero from "./Hero";
import Message from "../../components/Message/Index";
import { Recipe } from "../../interfaces/RecipeInterface";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <Container>
      <Hero />
      <Row>
        {!recipes?.length ? (
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
            {recipes?.map((recipe: Recipe) => (
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

export default Home;
