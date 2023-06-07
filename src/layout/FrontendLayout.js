import { Copyright } from "../components/frontend/copyright/Copyright";
import { Navbar } from "../components/frontend/navbar/Navbar";

const FrontendLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Copyright />
    </main>
  );
};

export default FrontendLayout;
