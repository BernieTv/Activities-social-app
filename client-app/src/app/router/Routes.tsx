import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import App from '../layout/App';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../stores/ServerError';
import LoginForm from '../../features/users/LoginForm';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'manage/:id', element: <ActivityForm key="manage" /> },
      { path: 'createActivity', element: <ActivityForm key="create" /> },

      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },

      { path: 'login', element: <LoginForm /> },

      { path: '*', element: <Navigate relative="route" to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
