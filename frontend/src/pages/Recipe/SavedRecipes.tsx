import { useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Index";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { getSavedRecipes } from "../../redux/feature/Recipe/recipeSlice";

const SavedRecipes = () => {
  const { savedRecipes, isLoading } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const userID = user?._id as string;

  useEffect(() => {
    if (token) {
      dispatch(getSavedRecipes({ userID, token }));
    }
  }, [dispatch, token, userID]);

  return (
    <Container>
      <div className='px-4 my-5 text-center'>
        <h1 className='display-5 fw-bold'>
          {savedRecipes?.length === 0 ? "No saved recipes" : "My saved recipes"}
        </h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead'>
            <Badge bg='info' className='me-2'>
              {savedRecipes?.length}
            </Badge>
            saved recipes so far
          </p>
        </div>
      </div>

      {isLoading && <Loader />}

      <Row className=''>
        {savedRecipes?.map((myRecipe) => (
          <Col lg={3} md={4} sm={6} key={myRecipe?._id}>
            <Card className='mt-2'>
              <Link to={`/recipe-details/${myRecipe?._id}`}>
                <Card.Img
                  variant='top'
                  src={myRecipe?.image}
                  className='img-fluid'
                />
              </Link>
              <Card.Body>
                <Card.Title className='d-flex justify-content-center'>
                  <span>{myRecipe?.name}</span>
                </Card.Title>
                <Card.Text>
                  <span className='fw-bold'>Category:</span>{" "}
                  {myRecipe?.category?.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedRecipes;
