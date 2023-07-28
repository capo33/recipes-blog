import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import logo from "../../assets/logo.png";
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { logout } from "../../redux/feature/Auth/authSlice";
import { getSavedRecipes } from "../../redux/feature/Recipe/recipeSlice";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { savedRecipes } = useAppSelector((state) => state.recipe);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;
  const userID = user?._id as string;

  useEffect(() => {
    if (token) dispatch(getSavedRecipes({ userID, token }));
  }, [dispatch, token, userID]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header style={{ zIndex: 1, position: "sticky", top: 0 }}>
      <Navbar bg='success' variant='' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='yummy' width='150' />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav
              className='ms-auto'
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              {/* <SearchBox /> */}
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/saved-recipes'>
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>
              {user && (
                <LinkContainer to='/saved-recipes'>
                  <Nav.Link className='d-flex align-items-center justify-content-center'>
                    Saved Recipes
                    {savedRecipes?.length > 0 && (
                      <Badge pill bg='primary' className='mx-1'>
                        {savedRecipes?.length}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <FaUser className='me-2' />
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/add-recipe'>
                    <NavDropdown.Item>
                      <AiOutlinePlus className='me-2' />
                      Add recipe
                    </NavDropdown.Item>
                  </LinkContainer>

                  {user && user.role === "admin" && (
                    <>
                      <LinkContainer to='/admin/add-category'>
                        <NavDropdown.Item>
                          <AiOutlinePlus className='me-2' />
                          Add category
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/all-categories'>
                        <NavDropdown.Item>
                          <BsGrid className='me-2' />
                          Admin categories
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>
                          <HiOutlineUserGroup className='me-2' />
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className='text-danger'
                  >
                    <AiOutlineLogout className='me-2' />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link className='d-flex align-items-center justify-content-center'>
                      <BiLogIn className='me-1' />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link className='d-flex align-items-center justify-content-center'>
                      <BsFillPersonPlusFill className='me-1' />
                      Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
