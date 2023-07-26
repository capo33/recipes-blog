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
import PrivateRoute from "./Guards/PrivateRoute";
import AdminRoute from "./Guards/AdminRoute";
import AddCategory from "../pages/Category/admin/AddCategory";
import Categories from "../pages/Category/Categories";
import AllCategoriesForAdmin from "../pages/Category/admin/AllCategoriesForAdmin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="recipe-details/:id" element={<RecipeDetails />} />
      <Route path="add-recipe" element={<AddRecipe />} />
      <Route path='categories' element={<Categories />} />

      <Route path='' element={<PrivateRoute />}>
{/* '        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />' */}
      </Route>
      <Route path="" element={<AdminRoute />}>
      <Route path='/admin/add-category' element={<AddCategory />} />
      <Route path='/admin/all-categories' element={<AllCategoriesForAdmin />} />

      </Route>

    </Route>
  )
);

export default routes;