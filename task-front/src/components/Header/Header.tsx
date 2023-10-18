/* eslint-disable import/no-cycle */
import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeaderProps {
  taskCount: number;
}

export const Header: React.FC<HeaderProps> = ({ taskCount }) => (
  <Box textAlign='left'>
    <Typography sx={{ fontSize: 35 }} variant='h1' component='h1' gutterBottom>
      Task list {taskCount} task(s)
    </Typography>
  </Box>
);
