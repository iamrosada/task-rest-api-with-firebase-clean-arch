import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { TextField, Paper, Button, Box, Stack } from '@mui/material';

import type { Task } from '../../App';

const DEFAULT_TASK = { name: '', description: '' };

interface AddTaskPanelProps {
  mode: 'add';
  onAddTask: ({ name, description }: Omit<Task, 'id' | 'checked'>) => void;
}

interface EditTaskPanelProps {
  mode: 'edit';
  editTask: Omit<Task, 'id' | 'checked'>;
  onChangeTask: ({ name, description }: Omit<Task, 'id' | 'checked'>) => void;
}

type TaskPanelProps = AddTaskPanelProps | EditTaskPanelProps;

export const TaskPanel: React.FC<TaskPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const [task, setTask] = React.useState(isEdit ? props.editTask : DEFAULT_TASK);

  const onClick = () => {
    if (isEdit) {
      return props.onChangeTask(task);
    }
    props.onAddTask(task);
    setTask(DEFAULT_TASK);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: '15px',
        width: '100%',
        padding: '15px 20px',
        borderRadius: 1,
        gap: 2
      }}
    >
      <Stack direction='row' spacing={1}>
        <TextField value={task.name} onChange={onChange} name='name' label='name' fullWidth />
        <TextField
          value={task.description}
          onChange={onChange}
          name='description'
          label='description'
          fullWidth
        />
      </Stack>
      <Box textAlign='right' marginTop={2}>
        <Button startIcon={<AddIcon />} variant='outlined' onClick={onClick}>
          {isEdit ? 'EDIT' : 'ADD'}
        </Button>
      </Box>
    </Paper>
  );
};
