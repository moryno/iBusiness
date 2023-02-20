import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <main className="grid min-h-screen grid-rows-header">
      <Navbar onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
      <div className="grid md:grid-cols-sidebar">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
