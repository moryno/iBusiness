import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Home from "./pages/Home";
import New from "./pages/New";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";
import CreateForm from "./components/CreateForm";

function App() {
  const currentUser = useSelector((state) => state.user?.currentUser?.user);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
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
          path: "/new",
          element: <New />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/test",
          element: <CreateForm />,
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
