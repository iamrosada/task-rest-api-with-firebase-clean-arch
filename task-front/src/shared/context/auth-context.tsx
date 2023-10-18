/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { client } from '../api';
import { deleteCookie } from '../util';

interface AuthContextType {
  loginFn: (email: string, password: string) => Promise<void>;
  registerFn: (email: string, password: string) => Promise<void>;
  signInWithGoogleFn: () => Promise<void>;
  sendPasswordResetFn: (email: string) => Promise<void>;
  logoutFn: () => Promise<void>;
  isAuthenticated: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode; 
}
const AuthContext = createContext<AuthContextType>({
  logoutFn: async () => {},
  registerFn: async () => {},
  signInWithGoogleFn: async () => {},
  sendPasswordResetFn: async () => {},
  loginFn: async () => {},
  isAuthenticated: false
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginFn = useCallback(async (email: string, password: string): Promise<void> => {
    try {
     const response =  await client.post('/auth/login', {
        email,
        password
      });
      if (response.headers) {
        response.headers.Authorization = response.data.data;
      }
      localStorage.setItem('x-access-token',response.data.data)
      Cookies.set('access_token_ivipcoins',response.data.data)

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const registerFn = useCallback(async (email: string, password: string): Promise<void> => {
    try {
     const response =  await client.post('/auth/register', {
        email,
        password
      })
      client.defaults.headers.authorization = `${response.data}`;
      localStorage.setItem('x-access-token',response.data)
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const signInWithGoogleFn = useCallback(async (): Promise<void> => {
    try {
      await client.get('/auth/signInWithGoogle');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const sendPasswordResetFn = useCallback(async (email: string): Promise<void> => {
    await client.post('/auth/sendPasswordReset', { email });
  }, []);

  const logoutFn = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line no-useless-catch
    try {
      await client.get('/auth/logout');
      deleteCookie('access_token_ivipcoins');
      localStorage.removeItem('x-access-token')
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  }, []);

  const authContextValue = useMemo(() => ({
    loginFn,
    registerFn,
    signInWithGoogleFn,
    sendPasswordResetFn,
    logoutFn,
    isAuthenticated
  }), [isAuthenticated]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
