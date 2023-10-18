/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useAuthContext } from '../../shared/context/auth-context';

const Login = () => {
  const { loginFn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginButtonStyle = {
    width: '100%',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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

  const handleLogin = () => {
    loginFn(email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });
  };
  return (
    <Container style={containerStyle}>
      <Paper elevation={3} className='paper'>
        <Typography display='flex' textAlign='center' justifyContent='center' variant='h5'>
          Login
        </Typography>
        <Box display='flex' flexDirection='column' textAlign='center' padding='30px'>
          <TextField
            style={textBoxStyle}
            className='textfield'
            label='E-mail Address'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={textBoxStyle}
            className='textfield'
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            style={loginButtonStyle}
            variant='contained'
            color='primary'
            onClick={handleLogin}
          >
            Login
          </Button>
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
