import { createBrowserRouter } from 'react-router-dom';

// Pages
import Home from './pages/home/home';
import PageNotFound from './pages/page-not-found/page_not_found';
import YourGroups from './pages/groups/your-groups/yourGroups';
import MessageBoard from './pages/gorup-overview/messageBoard';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />,
    },
    {
      path: '/group-overview',
      element: <MessageBoard />,
      errorElement: <PageNotFound />,
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
