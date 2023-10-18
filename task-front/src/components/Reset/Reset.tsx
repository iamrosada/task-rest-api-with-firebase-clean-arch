/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';

import { useFormik } from 'formik';
import { useAuthContext } from '../../shared/context/auth-context';
import { validationResetSchema } from '../../shared/validations';
import { containerStyle, textBoxStyle, resetBtnStyle } from '../../styles';



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
    validationSchema:validationResetSchema,
    onSubmit,
  });
  
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
