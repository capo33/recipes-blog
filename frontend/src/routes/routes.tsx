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
import PrivateRoute from "../Guards/PrivateRoute";
import AdminRoute from "../Guards/AdminRoute";
import AddCategory from "../pages/Category/admin/AddCategory";
import Categories from "../pages/Category/Categories";
import AllCategoriesForAdmin from "../pages/Category/admin/AllCategoriesForAdmin";
import Register from "../pages/Auth/Register";
import UpdateCategory from "../pages/Category/admin/UpdateCategory";
import SavedRecipes from "../pages/Recipe/SavedRecipes";
import CategoryDetails from "../pages/Category/CategoryDetails";
import UpdateRecipe from "../pages/Recipe/UpdateRecipe";
import { GuestProfile } from "../pages/UserProfile/GuestProfile";
import Profile from "../pages/UserProfile/Profile";
import UpdateProfile from "../pages/UserProfile/UpdateProfile";
import Users from "../pages/UserProfile/admin/Users";
import UserEdit from "../pages/UserProfile/admin/UserEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='recipe-details/:recipeId' element={<RecipeDetails />} />
      <Route path='add-recipe' element={<AddRecipe />} />
      <Route path='categories' element={<Categories />} />
      <Route path='/category/:slug' element={<CategoryDetails />} />
      <Route path='/user-profile/:guestID' element={<GuestProfile />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/saved-recipes' element={<SavedRecipes />} />
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
