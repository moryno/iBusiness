import axios from "axios";
import { Copyright } from "../components/frontend/copyright/Copyright";
import { Footer } from "../components/frontend/footer/Footer";
import { Navbar } from "../components/frontend/navbar/Navbar";
import Constant from "../utils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUserInfo } from "../redux/reducers/userSlice";

const FrontendLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkAuthentication() {
      const axiosClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
      });
      try {
        const { status } = await axiosClient.get(
          Constant.ACTION.CHECK_AUTH_STATE
        );
        if (status === 200) {
          return;
        }
      } catch (ex) {
        dispatch(logoutUserInfo());
      }
    }
    checkAuthentication();
  }, [dispatch]);

  return (
    <main>
      <Navbar />
      {children}
      <Footer />
      <Copyright />
    </main>
  );
};

export default FrontendLayout;
