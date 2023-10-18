/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../../shared/context/auth-context';

const Register = () => {
  const { registerFn } = useAuthContext();
  const navigate = useNavigate();

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
    marginBottom: '10px',
  };

  const registerBtnStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px',
    border: 'none',
    color: 'white',
    backgroundColor: 'black',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values:any) => {
    try {
      await registerFn(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration Error:', error);
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
      <Box display='flex' flexDirection='column' textAlign='center' padding='30px'>
        <Typography variant='h5'>Register</Typography>
      
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={textBoxStyle}
            name="email"
            label='E-mail Address'
            type='email'
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            style={textBoxStyle}
            name="password"
            label='Password'
            type='password'
            variant='outlined'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            style={registerBtnStyle}
            variant='contained'
            color='primary'
            type="submit"
          >
            Register
          </Button>
        </form>
        <Box>
          Already have an account?{' '}
          <Link component={RouterLink} to='/'>
            Login
          </Link>{' '}
          now.
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
