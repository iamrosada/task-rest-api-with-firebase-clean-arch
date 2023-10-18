/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link } from '@mui/material';
import { useAuthContext } from '../../shared/context/auth-context';

const Register = () => {
  const { registerFn } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = () => {
    registerFn(email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };
  const containerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const textBoxStyle = {
    padding: '10px',
    fontSize: '18px',
    marginBottom: '10px'
  };

  const registerBtnStyle = {
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
      >
        <Typography variant='h5'>Register</Typography>
      
        <TextField
          style={textBoxStyle}
          label='E-mail Address'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail Address'
        />
        <TextField
          style={textBoxStyle}
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <Button style={registerBtnStyle} variant='contained' color='primary' onClick={register}>
          Register
        </Button>
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
