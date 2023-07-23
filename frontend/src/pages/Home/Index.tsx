import { Col, Container, Row } from "react-bootstrap";
import { useEffect  } from "react";

import Hero from "./Hero";
import { Recipe } from "../../interfaces/RecipeInterface";
import { getAllRecipes } from "../../redux/feature/Recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Index";

const Home = () => {
  const { recipes } = useAppSelector((state) => state.recipe);

  console.log("recipes", recipes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Hero />
        <Row>
          {recipes?.length === 0 && <Loader />}
          {recipes?.map((recipe: Recipe) => (
            <Col sm={12} md={6} lg={4} xl={3} className='mb-4' key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
