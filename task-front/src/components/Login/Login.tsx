/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Paper, Typography, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../../shared/context/auth-context';

const Login = () => {
  const { loginFn } = useAuthContext();
  const navigate = useNavigate();

  const loginButtonStyle = {
    width: '100%',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const containerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textBoxStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px'
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: { email: string; password: string; }) => {
    try {
      await loginFn(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container style={containerStyle}>
      <Paper elevation={3} className='paper'>
        <Typography display='flex' textAlign='center' justifyContent='center' variant='h5'>
          Login
        </Typography>
        <Box display='flex' flexDirection='column' textAlign='center' padding='30px'>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={textBoxStyle}
              className='textfield'
              name="email"
              label="E-mail Address"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              style={textBoxStyle}
              className='textfield'
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              style={loginButtonStyle}
              variant='contained'
              color='primary'
              type="submit"
            >
              Login
            </Button>
          </form>
        </Box>
        <Link component={RouterLink} to='/reset' className='link' padding="10px" marginBottom="20px">
          Forgot Password
        </Link>
        <Link component={RouterLink} to='/register' padding="10px" className='link' marginBottom="20px">
          &apos;Don&apos;t have an account? Register now.&apos;
        </Link>
      </Paper>
    </Container>
  );
};

export default Login;



