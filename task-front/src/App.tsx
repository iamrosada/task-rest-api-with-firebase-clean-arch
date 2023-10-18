/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Header, TaskPanel, TaskList } from './components';
import { useTaskContext } from './shared/context/response-context';
import Search from './components/Search/Search';
import { useAuthContext } from './shared/context/auth-context';

export type Task = {
  uuid: string;
  title: string;
  description: string;
};


export const App = () => {
  const [editTaskId, setEditTaskId] = React.useState<string | null>(null);
  const { createTaskFn, deleteTaskFn, updateTaskFn, listTasksFn, taskItems } = useTaskContext();
  const { logoutFn } = useAuthContext(); 

  const [taskList, setTaskList] = React.useState<Task[]>(taskItems);

  const [sizeReal, setSizeReal] = React.useState<number>(1);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage: number = 2;
  const [isLoading, setIsLoading] = useState(false);

  const loadTasks = async (page: number, itemsPerPage: number) => {
    setIsLoading(true);
    try {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const response = await listTasksFn(startIndex, endIndex);

      setTaskList(response.tasks);
      setSizeReal(response.size);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < sizeReal) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadTasks(nextPage, itemsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      loadTasks(previousPage, itemsPerPage);
    }
  };

  useEffect(() => {
    loadTasks(currentPage, itemsPerPage);
  }, [itemsPerPage]);

  const onAddTask = async (title: string, description: string) => {
    try {
      const response = await createTaskFn(title, description);
      const newTask = response as any;

      setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    } catch (error) {
      console.error('Error creating a task:', error);
    }
  };

  const onDeleteTask = async (uuid: Task['uuid']) => {
    try {
      await deleteTaskFn(uuid);
      loadTasks(currentPage, itemsPerPage);
    } catch (error) {
      console.error('Error deleting a task:', error);
    }
  };

  const onEdit = (uuid: Task['uuid']) => {
    setEditTaskId(uuid);
  };

  const onChangeTask = async ({ title, description }: Omit<Task, 'uuid'>) => {
    try {
      if (editTaskId) {
        const response = await updateTaskFn(editTaskId, title, description);
        const updatedTask = response;
        setTaskList((prevTaskList) =>
          prevTaskList.map((task) => (task.uuid === updatedTask.uuid ? updatedTask : task))
        );
        setEditTaskId(null);
      }
    } catch (error) {
      console.error('Error updating a task:', error);
    }
  };

  const getCurrentTasks = (tasks: any) => {
    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  };

  useEffect(() => {
    setFilteredTask(
      taskList.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, taskList]);
  
  const handleLogout = async () => {
    try {
      await logoutFn();
      // Redirect to the login page or wherever you want
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    loadTasks(currentPage, itemsPerPage);
  }, []);

  useEffect(() => {
    const cookieValue = document?.cookie.split('access_token_ivipcoins=').join('');

    if (!cookieValue) {
      navigate('/login');
    }
  }, []);

  return (
    <Box marginTop={5} height="100%" display="flex" justifyContent="center" alignContent="center">
    <Box display="flex" flexDirection="column" width="500px">
      <Search search={search} setSearch={setSearch} />
      <Header taskCount={taskList.length} />
      <TaskPanel mode="add" onAddTask={onAddTask} />

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList
          editTaskId={editTaskId}
          taskList={getCurrentTasks(filteredTask)}
          onDeleteTask={onDeleteTask}
          onEdit={onEdit}
          onChangeTask={onChangeTask}
        />
      )}

      <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          startIcon={<NavigateBefore />}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          variant="outlined"
          disabled={currentPage * itemsPerPage >= sizeReal}
          onClick={handleNextPage}
          endIcon={<NavigateNext />}
        >
          Next
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ marginTop: '1rem' }}
      >
        Logout
      </Button>
    </Box>
  </Box>
  );
};



