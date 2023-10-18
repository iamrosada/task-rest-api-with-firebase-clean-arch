

import React from 'react';
import { IconButton, Box, Paper, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import type { Task } from '../../../App';

interface TaskItemProps {
  task: Task;
  onDeleteTask: (uuid: Task['uuid']) => void;
  onEdit: (uuid: Task['uuid']) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onEdit }) => (

    <Paper
    elevation={1}
    sx={{
      marginBottom: '15px',
      width: '100%',
      padding: '15px 20px',
      borderRadius: 1,
      gap: 2,
      opacity: 1
    }}
  >
    <Box textAlign='left'>
      <Typography
        sx={{ cursor: 'pointer', 
        textDecorationLine: 'none'
       }}
        variant='h5'
        component='h5'
        gutterBottom
      >
        {task.title}
      </Typography>
      <Typography variant='subtitle1' component='div' gutterBottom>
        {task.description}
      </Typography>
    </Box>
    <Box display='flex' justifyContent='flex-end'>
      <IconButton onClick={() => onEdit(task.uuid)} color='primary' aria-label='edit'>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteTask(task.uuid)} color='error' aria-label='delete'>
        <DeleteIcon />
      </IconButton>
    </Box>
  </Paper>
  
);
