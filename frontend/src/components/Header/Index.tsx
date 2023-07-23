import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { AuthUser } from "../../interfaces/AuthInterface";
import { logout, userProfile } from "../../redux/feature/Auth/authSlice";
import Loader from "../Loader/Index";

const Header = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;
  const userID = user?._id as string;

 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

 if(isLoading) return <Loader />
  return (
    <header>
      <Navbar bg='success' variant='' expand='md' collapseOnSelect>
        <Container>
          {/* <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='yummy' width='250' height='250' />
            </Navbar.Brand>
          </LinkContainer> */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                alt='logo'
                width='100'
                // height='30'
                className='d-inline-block  mx-2 my-2   '
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* <SearchBox /> */}

              {/* {user && (
                <LinkContainer to='/saved-recipes'>
                  <Nav.Link>
                    Saved Recipes
                    {savedRecipes?.length > 0 && (
                      <Badge pill bg='dark' className='mx-1'>
                        {savedRecipes?.length}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )} */}
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/add-recipe'>
                    <NavDropdown.Item>Add recipe</NavDropdown.Item>
                  </LinkContainer>

                  {user && user.role === "admin" && (
                    <>
                      <LinkContainer to='/admin/add-category'>
                        <NavDropdown.Item>Add category</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/all-categories'>
                        <NavDropdown.Item>All categories</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
