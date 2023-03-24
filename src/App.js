import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PurchaseOrder } from "./pages/PurchaseOrder";

import Layout from "./components/Layout";
import Orders from "./pages/Orders";

function App() {
  const ProtectedRoute = ({ children }) => {
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
          element: <PurchaseOrder orderstate={0}/>,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/updateorder/:id",
          element: <PurchaseOrder orderstate={1}/>,
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
