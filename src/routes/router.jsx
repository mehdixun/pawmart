import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetails";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import PrivateRoute from "../provider/PrivateRoute";
import MyOrder from "../pages/MyOrders";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import MyListing from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },



      // Private Routes
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing></AddListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails></ListingDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
        <PrivateRoute>
          <MyOrders></MyOrders> 
        </PrivateRoute>
      )
      },

      { path: "/product/:id", element: <ProductDetails></ProductDetails> },
      {
        path: "/my-orders",
        element: <MyOrder></MyOrder>
      },
      {
    path: "/pets&supplies",
    element: <PetsAndSupplies></PetsAndSupplies>
    },
    {
    path: "/my-listings",
    element: <MyListing></MyListing>
    }

    ],
  },
]);

export default router;
