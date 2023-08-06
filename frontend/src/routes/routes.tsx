import App from "../App";
import Login from "../pages/Auth/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../pages/Home/Index";
import AdminRoute from "../Guards/AdminRoute";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../Guards/PrivateRoute";
import AddRecipe from "../pages/Recipe/AddRecipe";
import Profile from "../pages/UserProfile/Profile";
import Users from "../pages/UserProfile/admin/Users";
import Categories from "../pages/Category/Categories";
import SavedRecipes from "../pages/Recipe/SavedRecipes";
import UpdateRecipe from "../pages/Recipe/UpdateRecipe";
import RandomRecipe from "../pages/Recipe/RandomRecipe";
import LatestRecipe from "../pages/Recipe/LatestRecipe";
import RecipeDetails from "../pages/Recipe/RecipeDetails";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import UserEdit from "../pages/UserProfile/admin/UserEdit";
import AddCategory from "../pages/Category/admin/AddCategory";
import UpdateProfile from "../pages/UserProfile/UpdateProfile";
import CategoryDetails from "../pages/Category/CategoryDetails";
import { GuestProfile } from "../pages/UserProfile/GuestProfile";
import UpdateCategory from "../pages/Category/admin/UpdateCategory";
import AllCategoriesForAdmin from "../pages/Category/admin/AllCategoriesForAdmin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* <Route path='' element={<Home />} /> */}
      <Route index={true} path='/' element={<Home />} />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />

      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/random' element={<RandomRecipe />} />
      <Route path='/latest' element={<LatestRecipe />} />
      <Route path='recipe-details/:recipeId' element={<RecipeDetails />} />
      <Route path='categories' element={<Categories />} />
      <Route path='/category/:slug' element={<CategoryDetails />} />
      <Route path='/user-profile/:guestID' element={<GuestProfile />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/saved-recipes' element={<SavedRecipes />} />
        <Route path='add-recipe' element={<AddRecipe />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-recipe/:recipeId' element={<UpdateRecipe />} />
        <Route path='/update-profile/:id' element={<UpdateProfile />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/add-category' element={<AddCategory />} />
        <Route path='/admin/edit-category/:slug' element={<UpdateCategory />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />

        <Route
          path='/admin/all-categories'
          element={<AllCategoriesForAdmin />}
        />
      </Route>
    </Route>
  )
);

export default routes;
