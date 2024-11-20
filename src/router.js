import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import PageNotFound from './pages/page-not-found/page_not_found';
import Dashboard from './pages/dashboard/dashboard';
import MyGroups from './pages/dashboard/my_groups_tab';
import Notifications from './pages/dashboard/notifications_tab';
import DashTab from './pages/dashboard/dash_tab';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />,
    },
      {
          path: '/user',
          element: <Dashboard />,
          errorElement: <PageNotFound />,
          children: [
              {
                  path: 'dashboard',
                  element: <DashTab />,
                  errorElement: <PageNotFound />,
              },
              {
                  path: 'my',
                  element: <MyGroups />,
                  errorElement: <PageNotFound />,
              },
              {
                  path: 'notifications',
                  element: <Notifications />,
                  errorElement: <PageNotFound />,
              },
          ]
      },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
