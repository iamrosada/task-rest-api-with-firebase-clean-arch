import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {client} from '../api';

export type Task = {
  [x: string]: any;
  uuid: string;
  title: string;
  description: string;
};
interface ApiResponse {
  size: number;
  tasks: Task[];

}

interface TaskContextType {
  createTaskFn: (title: string, description: string) => Promise<void>;
  deleteTaskFn: (uuid: string) => Promise<void>; 
  updateTaskFn: (uuid: string, title: string, description: string) => Promise<Task>;
  listTasksFn: (page: number, itemsPerPage: number) => Promise<ApiResponse>;
  loginFn: (name: string, password: string) => Promise<string>;
  logoutFn: () => void;
  taskItems: Task[];
  realSizeArray:number
}

const TaskContext = createContext<TaskContextType>({
  logoutFn: () => { },
  createTaskFn: () => Promise.resolve() ,
  deleteTaskFn: () => Promise.resolve(),
  updateTaskFn: () => Promise.resolve() as any,
  listTasksFn: () => Promise.resolve() as any,
  loginFn: () => Promise.resolve() as any, 
  taskItems: [],
  realSizeArray:0,
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }: any) => {
  const [error, setError] = useState<string | any>('');
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  const [realSizeArray, setRealSizeArray] = useState<number>(0)


  const createTaskFn = useCallback(async (title: string, description: string): Promise<void> => {
    try {
      const response = await client.post<Task>('/tasks', { title, description });

      return setTaskItems((prevTaskItems) => [...prevTaskItems, response.data.task]);

    } catch (error: any) {
      setError(`Error creating task: ${error.message}`);
      throw error;
    }
  }, []);

  const deleteTaskFn = useCallback(async (uuid: string): Promise<void> => {
    try {
      await client.delete<void>(`tasks/${uuid}`);
      setTaskItems((prevTaskItems) => prevTaskItems.filter((task) => task.uuid !== uuid));
    } catch (error: any) {
      setError(`Error deleting task: ${error.message}`);
      throw error;
    }
  }, []);

  const updateTaskFn = useCallback(async (uuid: string, title: string, description: string): Promise<Task> => {
    try {
      const response = await client.patch<Task>(`/tasks/${uuid}`, { uuid, title, description });
      setTaskItems((prevTaskItems) =>
        prevTaskItems.map((task) => (task.uuid === uuid ? { ...task, title, description } : task))
      );
      return response.data.task;
    } catch (error: any) {
      setError(`Error updating task: ${error.message}`);
      throw error;
    }
  }, []);

  // const listTasksFn = useCallback(async (): Promise<Task[]> => {
  //   try {
  //     const response = await client.get<ApiResponse>('/tasks');
  //     setTaskItems([...taskItems, ...(response.data?.tasks || [])]);

  //     return response.data?.tasks;
  //   } catch (error: any) {
  //     setError(`Error listing tasks: ${error.message}`);
  //     throw error;
  //   }
  // }, []);
  // const listTasksFn = useCallback(async (page: number, itemsPerPage: number): Promise<Task[]> => {
  //   try {
  //     const response = await client.get<ApiResponse>('/tasks', {
  //       params: {
  //         page,
  //         itemsPerPage,
  //       },
  //     });
  //     setTaskItems([...taskItems, ...(response.data?.tasks || [])]);
  
  //     return response.data?.tasks;
  //   } catch (error: any) {
  //     setError(`Error listing tasks: ${error.message}`);
  //     throw error;
  //   }
  // }, [client, taskItems]);
  const listTasksFn = useCallback(async (page: number, itemsPerPage: number): Promise<ApiResponse> => {
    try {
      const response = await client.get<ApiResponse>(`/tasks?page=${page}&itemsPerPage=${itemsPerPage}`);
      setTaskItems([...taskItems, ...(response.data?.tasks || [])]);
      console.log("response.data?.tasks;",response.data?.size, realSizeArray)
      setRealSizeArray(response.data?.size)
      console.log("response.data?.tasks;",response.data?.size, realSizeArray)

      return {tasks:response.data?.tasks, size: response.data?.size}
    } catch (error: any) {
      setError(`Error listing tasks: ${error.message}`);
      throw error;
    }
  }, [client, taskItems]);

  const loginFn = useCallback(async (name: string, password: string): Promise<string> => {
    try {
      const response = await client.post<string>('/tasks/login', { name, password });
      const token = response.data;
      localStorage.setItem('x-access-token', token);
      return token;
    } catch (error: any) {
      setError(`Login error: ${error.message}`);
      throw error;
    }
  }, []);
  const logoutFn = () => {
    localStorage.removeItem('x-access-token');
  };

  const contextValue = useMemo(() => ({
    createTaskFn,
    deleteTaskFn,
    updateTaskFn,
    listTasksFn,
    loginFn,
    logoutFn,
    taskItems,
    realSizeArray,
    error,
  }), [taskItems, error]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
