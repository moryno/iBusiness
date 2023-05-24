import { Outlet } from "react-router-dom";
import { Copyright } from "../components/frontend/copyright/Copyright";
import { Navbar } from "../components/frontend/navbar/Navbar";

const FrontendLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Copyright />
    </main>
  );
};

export default FrontendLayout;
