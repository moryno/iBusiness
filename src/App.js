import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PurchaseOrder } from "./pages/PurchaseOrder";

import Layout from "./components/Layout";

function App() {
  const [userToken, setUserToken] = useState("");

  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  const ProtectedRoute = ({ children }) => {
    if (userToken) {
      if (!currentUser) {
        console.log(currentUser);
        return (window.location.href =
          "https://i-business-ui-git-main-moryno.vercel.app/");
      }
      return children;
    } else {
      return (window.location.href =
        "https://i-business-ui-git-main-moryno.vercel.app/");
    }
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
          element: <Home setUserToken={setUserToken} />,
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
