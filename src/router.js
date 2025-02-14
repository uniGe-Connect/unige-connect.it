import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Redirect from './pages/home/redirect';
import PageNotFound from './pages/page-not-found/page_not_found';
import Dashboard from './pages/dashboard/dashboard';
import Notifications from './pages/dashboard/notifications_tab';
import DashTab from './pages/dashboard/groups';
import ProfessorGroups from './pages/professor/dashboard/professorGroups';
import GroupOverview from './pages/group-overview/groupOverview';
import GroupsPage from './pages/dashboard/my-groups/myGroups';
import ProfessorDashboard from './pages/professor/dashboard/professorDashboard';
import ProfessorMyGroups from './pages/professor/dashboard/professorMyGroups';
import ProfessorStatistics from './pages/professor/dashboard/professorStatistics';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/redirect',
      element: <Redirect />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/group-overview/:groupId',
      element: <GroupOverview />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/professor/dashboard',
      element: <ProfessorDashboard />,
      errorElement: <PageNotFound />,
    },
    {
        path: '/dashboard/:tab',
        element: <Dashboard />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: 'Groups',
                element: <DashTab />,
                errorElement: <PageNotFound />,
            },
            {
                path: 'Dashboard',
                element: <GroupsPage />,
                errorElement: <PageNotFound />,
            },
            {
                path: 'Notifications',
                element: <Notifications />,
                errorElement: <PageNotFound />,
            },
        ]
    },
    {
        path: '/professor/dashboard/:tab',
        element: <ProfessorDashboard />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: 'Groups',
                element: <ProfessorGroups />,
                errorElement: <PageNotFound />,
            },
            {
                path: 'Dashboard',
                element: <ProfessorMyGroups />,
                errorElement: <PageNotFound />,
            },
            {
                path: 'Statistics',
                element: <ProfessorStatistics />,
                errorElement: <PageNotFound />,
            }
        ]
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
