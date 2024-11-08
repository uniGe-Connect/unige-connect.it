import { createBrowserRouter } from "react-router-dom";

//Pages
import Home from "./pages/home/home";
import PageNotFound from "./pages/page-not-found/page_not_found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
]);
