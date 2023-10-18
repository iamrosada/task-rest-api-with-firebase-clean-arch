import React from 'react';
import ReactDOM from 'react-dom/client';

// import { App } from './App';

import './index.css';
import { TaskProvider } from './shared/context/response-context';
import { AuthProvider } from './shared/context/auth-context';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider>
    <TaskProvider>
      <AppRoutes/>
    </TaskProvider>
  </AuthProvider>
);
