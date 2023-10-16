import React, {  useEffect } from 'react';
import { Box } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { Header, TaskPanel, TaskList } from './components';
import { useTaskContext } from './shared/context/response-context';

export type Task = {
  uuid: string;
  title: string;
  description: string;
};

export const App = () => {
  const [editTaskId, setEditTaskId] = React.useState<string | null>(null);
  const { createTaskFn, deleteTaskFn, updateTaskFn, listTasksFn,taskItems } = useTaskContext();
  const [taskList, setTaskList] = React.useState<Task[]>(taskItems);

  const onAddTask = async (title:string, description:string) => {
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
      const response = await listTasksFn();
      setTaskList(response);
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

  useEffect(() => {
    
    const updateTaskList = async () => {
      try {
        const response = await listTasksFn();
        setTaskList(response); 
      } catch (error) {
        console.error('Error updating task list:', error);
      }
    };

    updateTaskList(); 

  }, [taskList, listTasksFn]); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listTasksFn();
        console.log(response,"dentro do effect")
        setTaskList([...taskList, ...(response || [])]);
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    };
  
    fetchData(); 
  }, []);
  return (
    <Box marginTop={5} height='100%' display='flex' justifyContent='center' alignContent='center'>
      <Box display='flex' flexDirection='column' width='500px'>
        <Header taskCount={taskList.length} />
        <TaskPanel mode='add' onAddTask={onAddTask} />
        <TaskList
          editTaskId={editTaskId}
          taskList={taskList}
          onDeleteTask={onDeleteTask}
          onEdit={onEdit}
          onChangeTask={onChangeTask}
        />
      </Box>
    </Box>
  );
};
