import React from 'react';
import { IconButton, Box, Paper, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import type { Task } from '../../../App';

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: Task['id']) => void;
  onCheckTask: (id: Task['id']) => void;
  onEdit: (id: Task['id']) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onCheckTask, onEdit }) => (
  <Paper
    elevation={1}
    sx={{
      marginBottom: '15px',
      width: '100%',
      padding: '15px 20px',
      borderRadius: 1,
      gap: 2,
      opacity: task.checked ? 0.5 : 1
    }}
  >
    <Box textAlign='left'>
      <Typography
        onClick={() => onCheckTask(task.id)}
        sx={{ cursor: 'pointer', textDecorationLine: task.checked ? 'line-through' : 'none' }}
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
      <IconButton onClick={() => onEdit(task.id)} color='primary' aria-label='edit'>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteTask(task.id)} color='error' aria-label='delete'>
        <DeleteIcon />
      </IconButton>
    </Box>
  </Paper>
);
