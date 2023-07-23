import App from "../App";
import Login from "../pages/Auth/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home/Index";
import RecipeDetails from "../pages/Recipe/RecipeDetails";
import AddRecipe from "../pages/Recipe/AddRecipe";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="recipe-details/:id" element={<RecipeDetails />} />
      <Route path="add-recipe" element={<AddRecipe />} />

    </Route>
  )
);

export default routes;