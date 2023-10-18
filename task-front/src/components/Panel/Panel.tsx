/* eslint-disable import/no-cycle */
import React from 'react';
import { useFormik } from 'formik';
import { TextField, Paper, Button, Box, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Task } from '../../App';
import { validationSchema } from '../../shared/validations';
import {  useTaskContext } from '../../shared/context/response-context';

interface TaskPanelProps {
  mode: 'add' | 'edit';
  onChangeTask?: (task: Omit<Task, 'uuid'>) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onAddTask?: (title:string, description:string) => void;
  editTask?: Omit<Task, 'uuid'>;
}

export const TaskPanel: React.FC<TaskPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const { createTaskFn } = useTaskContext();


  const initialValues:Omit<Task, 'uuid'> = {
    title: isEdit ? props.editTask?.title : '' as unknown as any, 
    description: isEdit ? props.editTask?.description : '' as unknown as any,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values:Omit<Task, 'uuid'>) => {
      try {
        if (isEdit) {
          if (props.onChangeTask) {
            props.onChangeTask(values);
          }
        } else {
           await createTaskFn(values.title, values.description);
          formik.resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper
        elevation={1}
        sx={{
          marginBottom: '15px',
          width: '100%',
          padding: '15px 20px',
          borderRadius: 1,
          gap: 2,
        }}
      >
        <Stack direction='row' spacing={1}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && typeof formik.errors.title === 'string'
                ? formik.errors.title
                : ''
            }
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={
              formik.touched.description && typeof formik.errors.description === 'string'
                ? formik.errors.description
                : ''
            }
          />
        </Stack>
        
        <Box textAlign='right' marginTop={2}>
          <Button startIcon={<AddIcon />} variant='outlined' type="submit">
            {isEdit ? 'EDIT' : 'ADD'}
          </Button>
        </Box>
      </Paper>
    </form>
  );
};
