import React, { createContext, useContext, useState } from 'react';
import { useClient } from '../api';

export type Task = {
  uuid: string;
  title: string;
  description: string;
  checked: boolean;
};

const TaskContext = createContext({});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }:any) => {
  const client = useClient(); 
  const [taskItens, setTaskItens] = useState<Omit<Task,"uuid"|"checked">>()


  const createTaskFn = async (title:string, description:string) => {
    try {
      const response = await client.createTaskFn(title, description);
       setTaskItens(response.data)
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const deleteTaskFn = async (uuid:string) => {
    try {
      const response = await client.deleteTaskFn(uuid);
      return response;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const updateTaskFn = async (uuid:string, title:string, description:string) => {
    try {
      const response = await client.updateTaskFn(uuid, title, description);
      return response;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const listTasksFn = async () => {
    try {
      const response = await client.listTasksFn();
      return response;
    } catch (error) {
      console.error('Error listing tasks:', error);
      throw error;
    }
  };

  const loginFn = async (name:string, password:string) => {
    try {
      const token = await client.loginFn(name, password);
      return token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logoutFn = () => {
    client.logoutFn();
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    createTaskFn,
    deleteTaskFn,
    updateTaskFn,
    listTasksFn,
    loginFn,
    logoutFn,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
