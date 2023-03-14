import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PurchaseOrder } from "./pages/PurchaseOrder";

import Layout from "./components/Layout";
import { setupLogin } from "./helpers/auth";
import { loginSuccess } from "./redux/userSlice";
import request from "./helpers/requestMethod";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // const token = hash.split("=")[1];
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  console.log(location);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data } = await request.get("/User");
  //     console.log(data);
  //     setupLogin(data?.token);
  //     dispatch(loginSuccess(data));
  //   };

  //   if (token) getUser();
  // }, [token, dispatch]);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // return (window.location.href =
      //   "https://i-business-ui-git-main-moryno.vercel.app/");
      console.log(currentUser);
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/purchase-order",
          element: <PurchaseOrder />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
