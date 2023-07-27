import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthUser } from "../../interfaces/AuthInterface";
import { register } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

const Register = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthUser>({
    name: "",
    email: "",
    password: "",
    answer: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = user?.token;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (token) {
      navigate(redirect);
    } else {
      navigate("/register");
    }
  }, [token, navigate, redirect]);

  // Show password toggle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Change input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ formData, toast, navigate }));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='given-name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.email}
                onChange={handleChange}
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                  value={formData.password}
                  onChange={handleChange}
                  name='password'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.answer}
                onChange={handleChange}
                id='answer'
                label='What is your favorite color?'
                name='answer'
                autoComplete='answer'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent='space-around'>
            <Grid item xs={12}>
              <Link to='/forgot-password'>Forgot password?</Link>
            </Grid>
            <Grid item xs={12}>
              <Link to='/login'>Already have an account? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
