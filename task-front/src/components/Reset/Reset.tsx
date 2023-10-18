/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '../../shared/context/auth-context';


const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Reset = () => {
  const { sendPasswordResetFn } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (values:any) => {
    sendPasswordResetFn(values.email)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Password Reset Error:', error);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit,
  });

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  };

  const textBoxStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px',
  };

  const resetBtnStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px',
    border: 'none',
    color: 'white',
    backgroundColor: 'black',
  };

  return (
    <Container style={containerStyle}>
      <Box display='flex' flexDirection='column' textAlign='center' padding='30px' component='div'>
        <Typography variant='h5'>Password Reset</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={textBoxStyle}
            label='E-mail Address'
            variant='outlined'
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
          <Button
            style={resetBtnStyle}
            variant='contained'
            color='primary'
            type="submit"
          >
            Send password reset email
          </Button>
        </form>
        <Box>
          Dont have an account?{' '}
          <MuiLink component={Link} to='/register'>
            Register
          </MuiLink>{' '}
          now.
        </Box>
      </Box>
    </Container>
  );
};

export default Reset;
