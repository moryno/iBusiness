import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Profile from "./pages/dashboard/Profile";
import Home from "./pages/dashboard/Home";

import Layout from "./components/dashboard/Layout";
import { PurchaseOrder } from "./pages/dashboard/purchase-orders/PurchaseOrder";

import "./App.css";
import "./assets/styles.css";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { SignUp } from "./pages/landing-page/GetStarted";
import { SignIn } from "./pages/landing-page/SignIn";

function App() {
  const ProtectedRoute = ({ children }) => {
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/get-started",
      element: <SignUp />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/dashboard/purchase-order",
          element: <PurchaseOrder />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
