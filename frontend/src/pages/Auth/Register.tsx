import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthUser } from "../../interfaces/AuthInterface";
import { register } from "../../redux/feature/Auth/authSlice";
import FormContainer from "../../components/FormContainer/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";

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
    // <Container component='main' maxWidth='xs'>
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component='h1' variant='h5'>
    //       Register
    //     </Typography>
    //     <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TextField
    //             autoComplete='given-name'
    //             name='name'
    //             value={formData.name}
    //             onChange={handleChange}
    //             required
    //             fullWidth
    //             id='name'
    //             label='Name'
    //             autoFocus
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             value={formData.email}
    //             onChange={handleChange}
    //             id='email'
    //             label='Email Address'
    //             name='email'
    //             autoComplete='email'
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <FormControl variant='outlined' fullWidth>
    //             <InputLabel htmlFor='outlined-adornment-password'>
    //               Password
    //             </InputLabel>
    //             <OutlinedInput
    //               id='outlined-adornment-password'
    //               type={showPassword ? "text" : "password"}
    //               endAdornment={
    //                 <InputAdornment position='end'>
    //                   <IconButton
    //                     aria-label='toggle password visibility'
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge='end'
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //               label='Password'
    //               value={formData.password}
    //               onChange={handleChange}
    //               name='password'
    //             />
    //           </FormControl>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             value={formData.answer}
    //             onChange={handleChange}
    //             id='answer'
    //             label='What is your favorite color?'
    //             name='answer'
    //             autoComplete='answer'
    //           />
    //         </Grid>
    //       </Grid>
    //       <Button
    //         type='submit'
    //         fullWidth
    //         variant='contained'
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Register
    //       </Button>
    //       <Grid container>
    //         <Grid item xs>
    //           <Link to='/forgot-password'>
    //           <Typography variant='body2' color='text.secondary'>
    //               Forgot password?
    //             </Typography>
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link to='/login'>
    //             <Typography variant='body2' color='text.secondary'>
    //               Already have an account? Login
    //             </Typography>
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Container>
    <FormContainer className='mt-5'>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineUser />
            </InputGroup.Text>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              placeholder='Enter name'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              type='email'
              name='email'
              value={formData.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineLock />
            </InputGroup.Text>

            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder='Enter password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group
          controlId='showPassword'
          className='mt-1 d-flex justify-content-end'
        >
          <Form.Check
            type='switch'
            label='Show Password'
            onClick={handleClickShowPassword}
          />
        </Form.Group>

        <Form.Group controlId='answer'>
          <Form.Label>What is your favorite color?</Form.Label>

          <InputGroup>
            <InputGroup.Text id='basic-addon1'>
              <AiOutlineQuestionCircle />
            </InputGroup.Text>

            <Form.Control
              type='text'
              name='answer'
              value={formData.answer}
              placeholder='Enter answer'
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        
        <Button type='submit' variant='primary' className='mt-2'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col lg={12}>
          <Link
            to={redirect ? `/forgot-password?redirect=${redirect}` : "/login"}
          >
            Forgot Password
          </Link>
        </Col>
        <Col lg={12}>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Already have an account? Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
