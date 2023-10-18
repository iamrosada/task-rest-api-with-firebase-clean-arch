/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {client} from '../api';
import { auth as firebase } from "../../components/config/firebase-config";

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
  taskItems: Task[];
  realSizeArray:number,
  loginWithGoogle:() => void
}

const TaskContext = createContext<TaskContextType>({
  createTaskFn: () => Promise.resolve() ,
  deleteTaskFn: () => Promise.resolve(),
  updateTaskFn: () => Promise.resolve() as any,
  listTasksFn: () => Promise.resolve() as any,
  taskItems: [],
  realSizeArray:0,
  loginWithGoogle:() => { },
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }: any) => {
  const [error, setError] = useState<string | any>('');
  const [auth, setAuth] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
	const [token, setToken] = useState('');
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

  const listTasksFn = useCallback(async (page: number, itemsPerPage: number): Promise<ApiResponse> => {
   
    try {

      const response = await client.get<ApiResponse>(`/tasks?page=${page}&itemsPerPage=${itemsPerPage}`)
       
      setTaskItems([...taskItems, ...(response.data?.tasks || [])]);
      setRealSizeArray(response.data?.size)
       const cookieValue = document?.cookie.split("access_token_ivipcoins=").join("")
        console.log("cookieValue--->",cookieValue,Cookies.get('access_token_ivipcoins'))
      return {tasks:response.data?.tasks, size: response.data?.size}
    } catch (error: any) {
      setError(`Error listing tasks: ${error.message}`);
      throw error;
    }
  }, [client, taskItems]);



	const loginWithGoogle = () => {
		signInWithPopup(firebase, new GoogleAuthProvider())
			.then((userCred) => {
				if (userCred) {
					setAuth(true);
					window.localStorage.setItem('auth', 'true');
				}
			});
	};

 
  const contextValue = useMemo(() => ({
    createTaskFn,
    deleteTaskFn,
    updateTaskFn,
    listTasksFn,
    taskItems,
    realSizeArray,
    loginWithGoogle,
    error,
  }), [taskItems, error]);

  useEffect(() => {
		firebase.onAuthStateChanged((userCred) => {
			if (userCred) {
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
				userCred.getIdToken().then((token) => {
					setToken(token);
				});
			}
		});
	}, []);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
