import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import New from "../pages/New";
import { useState } from "react";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const Layout = () => {
    return (
      <div>
        <Navbar open={() => setIsExpanded(!isExpanded)} />
        <div style={{ display: "flex" }}>
          <Sidebar isExpanded={isExpanded} />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/new",
          element: <New />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
