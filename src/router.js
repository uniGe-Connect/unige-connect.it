import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import PageNotFound from './pages/page-not-found/page_not_found';
import Dashboard from './pages/dashboard/dashboard';
import MyGroups from './pages/dashboard/my_groups_tab';
import Notifications from './pages/dashboard/notifications_tab';
import DashTab from './pages/dashboard/dash_tab';
import YourGroups from './pages/groups/your-groups/yourGroups';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: 'dashtab',
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
    {
      path: '/groups/your-groups',
      element: <YourGroups />,
      errorElement: <PageNotFound />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_prependBasename: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true
    },
  }
);
