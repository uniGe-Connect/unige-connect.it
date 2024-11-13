import { createBrowserRouter } from 'react-router-dom';

// Pages
import Home from "./pages/home/home";
import PageNotFound from "./pages/page-not-found/page_not_found";
import YourGroups from "./pages/your-groups/your_groups";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />,
    },
    {
      path: "/your-groups",
      element: <YourGroups />,
      errorElement: <PageNotFound />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
