import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Menu,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

import { logout } from "../../redux/feature/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

interface IPage {
  id: number;
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const pages: IPage[] = [
  {
    id: 1,
    name: "Recipes",
    href: "/",
  },
  {
    id: 2,
    name: "Categories",
    href: "/categories",
  },
  {
    id: 3,
    name: "Saved Recipes",
    href: "/saved-recipes",
    icon: <BookmarkBorderOutlinedIcon />,
  },
];

function NavBar() {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const admin = user?.role === "admin";

  interface IMenu {
    id: number;
    name: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }
  const userMenuItems: IMenu[] = [
    {
      id: 1,
      name: "profile",
      href: "/profile",
      icon: <PersonIcon />,
    },
    {
      id: 2,
      name: "Add Recipe",
      href: "/add-recipe",
      icon: <AddIcon />,
    },
    ...(admin
      ? [
          {
            id: 3,
            name: "Add Category",
            href: "/admin/add-category",
            icon: <AddIcon />,
          },
          {
            id: 4,
            name: "All Categories",
            href: "/admin/allcategories",
            icon: <GridViewOutlinedIcon />,
          },
        ]
      : []),
    {
      id: 5,
      name: "Sign Out",
      href: "/login",
      icon: <LogoutOutlinedIcon />,
      onClick: handleLogout,
    },
  ];

  const authMenuItems = [
    {
      id: 1,
      name: "Login",
      href: "/login",
      icon: <LoginOutlinedIcon />,
    },
    {
      id: 2,
      name: "Register",
      href: "/register",
      icon: <PersonAddOutlinedIcon />,
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='sticky' sx={{ bgcolor: "blueviolet" }}>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <BakeryDiningOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Yummy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Header Pages */}
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Typography
                      variant='subtitle1'
                      noWrap
                      component={Link}
                      to={page.href}
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      {page.name === "Saved Recipes" ? (
                        <>
                          {page.name}
                          <Badge badgeContent={4} color='success'>
                            {page.icon}
                          </Badge>
                        </>
                      ) : (
                        page.name
                      )}
                    </Typography>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BakeryDiningOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Yummy
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                textAlign: "centrer",
                alignItems: "center",
              },
            }}
          >
            {/* Header Pages */}
            {pages.map((page) => (
              <Link
                to={page.href}
                key={page.id}
                className='nav-link'
                onClick={handleCloseNavMenu}
              >
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name === "Saved Recipes" ? (
                    <>
                      {page.name}
                      <Badge badgeContent={4} color='info'>
                        {page.icon}
                      </Badge>
                    </>
                  ) : (
                    page.name
                  )}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open menu'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src={user?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* User Pages */}
              {user
                ? userMenuItems.map((page) => (
                    <Typography
                      key={page.id}
                      variant='subtitle1'
                      noWrap
                      component={Link}
                      to={page.href}
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        {page.icon}
                        <span className='mx-1' onClick={page.onClick}>
                          {page.name}
                        </span>
                      </MenuItem>
                    </Typography>
                  ))
                : authMenuItems.map((page) => (
                    <Typography
                      key={page.id}
                      variant='subtitle1'
                      noWrap
                      component={Link}
                      to={page.href}
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        {page.icon}
                        <span className='mx-1'>{page.name}</span>
                      </MenuItem>
                    </Typography>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
