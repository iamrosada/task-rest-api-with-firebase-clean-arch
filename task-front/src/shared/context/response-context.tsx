/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
  loginFn: (name: string, password: string) => Promise<string>;
  logoutFn: () => void;
  taskItems: Task[];
  realSizeArray:number,
  loginWithGoogle:() => void
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
      setToken(token)
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

 
	const loginWithGoogle = () => {
		signInWithPopup(firebase, new GoogleAuthProvider())
			.then((userCred) => {
				if (userCred) {
					setAuth(true);
					window.localStorage.setItem('auth', 'true');
				}
			});
	};

 

	const fetchData = async () => {
		const res = await client.get('/tasks', {
			headers: {
				Authorization: document.cookie.indexOf('access_token=')
        
			},
		});
		console.log(res.data);
	};
  useEffect(() => {
		if (token) {
			fetchData();
		}
	}, [token]);
  const contextValue = useMemo(() => ({
    createTaskFn,
    deleteTaskFn,
    updateTaskFn,
    listTasksFn,
    loginFn,
    logoutFn,
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
