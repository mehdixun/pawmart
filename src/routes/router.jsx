import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../components/pages/Home";
import HomeLayout from "../layout/HomeLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {
            index: true,
            element: <Home></Home>
        }
    ]
  },
]);

export default router;