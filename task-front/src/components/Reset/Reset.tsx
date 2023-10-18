/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { useAuthContext } from '../../shared/context/auth-context';

const Reset = () => {
  const { sendPasswordResetFn } = useAuthContext();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const reset= () => {
    sendPasswordResetFn(email)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
  };


  const textBoxStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px'
  };

  const resetBtnStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px',
    border: 'none',
    color: 'white',
    backgroundColor: 'black'
  };

  return (
    <Container style={containerStyle}>
      <Box
        display='flex'
        flexDirection='column'
        textAlign='center'  
        padding='30px'
        component='div'
      >
        <Typography variant='h5'>Password Reset</Typography>
        <TextField
          style={textBoxStyle}
          label='E-mail Address'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          style={resetBtnStyle}
          variant='contained'
          color='primary'
          onClick={reset}
        >
          Send password reset email
        </Button>
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
