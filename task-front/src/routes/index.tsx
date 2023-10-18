/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { App } from '../App';
import Register from '../components/Register/Register';
import Reset from '../components/Reset/Reset';
import Login from '../components/Login/Login';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={<Reset />} />
      <Route path='/dashboard' element={<App />} />

    </Routes>
  </Router>
);

export default AppRoutes;
