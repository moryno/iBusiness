import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import New from "./pages/New";
import { useState } from "react";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const onShowPortal = () => {
    setShowPortal(true);
  };

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
        <New showPortal={showPortal} onClose={() => setShowPortal(false)} />
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
          element: <Home onShow={() => onShowPortal()} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
