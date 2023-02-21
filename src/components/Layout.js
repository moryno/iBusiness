import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <main className="grid min-h-screen grid-rows-header">
      <Navbar
        onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
        onMenuClick={() => setOpenSidebar((prev) => !prev)}
      />
      <div className="flex w-full">
        <Sidebar showSidebar={showSidebar} openSidebar={openSidebar} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
