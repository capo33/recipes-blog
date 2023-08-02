import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LinkContainer } from "react-router-bootstrap";
import { BsFillPersonPlusFill, BsGrid } from "react-icons/bs";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";

import { logout } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { getSavedRecipes } from "../../redux/feature/Recipe/recipeSlice";

import "./header.css";

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
      <Navbar bg='primary' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/' style={{ fontSize: "1.6rem" }}>
            <Navbar.Brand>
              <MdOutlineFastfood /> YupFood
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav
              className='ms-auto  '
              style={{ fontSize: "1.1rem", fontWeight: 500 }}
            >
              {/* <SearchBox /> */}
              <LinkContainer className='hover' to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer className='hover' to='/categories'>
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>
              {user && (
                <LinkContainer className='hover' to='/saved-recipes'>
                  <Nav.Link className='d-flex align-items-center  '>
                    Saved Recipes
                    {savedRecipes?.length > 0 && (
                      <Badge pill bg='warning' className='mx-1'>
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
                      <LinkContainer to='/admin/users'>
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
                  <LinkContainer className='hover' to='/login'>
                    <Nav.Link className='d-flex align-items-center justify-content-center'>
                      <BiLogIn className='me-1' />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer className='hover' to='/register'>
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
