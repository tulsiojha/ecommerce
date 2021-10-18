/** @format */

import { Navigate, useRoutes } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import ShippingDetail from "../pages/ShippingDetail";
import NewPost from "./NewPost";
import Page from "./Page";


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Page />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "delivery",
          element: <ShippingDetail />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "newpost",
          element: <NewPost />,
        },
      ],
    },
  ]);
}
