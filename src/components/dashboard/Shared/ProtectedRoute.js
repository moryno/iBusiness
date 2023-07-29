import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import {
  loginSuccess,
  logoutUserInfo,
} from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { getCRSFToken, setUpToken } from "../../../helpers/auth";
import OnboardingService from "../../../ClientServices/onboardingRequest";
import Constant from "../../../utils/constant";
import axios from "axios";
import { Loading } from "../../frontend/landing-page/Loading";
import { getSourceMenus } from "../../../redux/actions/sideMenusCall";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const isAuthenticated = useSelector((state) => state.user?.currentUser?.user);
  const isAuthenticated = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    getCRSFToken();
  }, []);

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
        window.location.href = process.env.REACT_APP_SIGNUPIN_URL;
      }
    }
    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await OnboardingService.get("/GetUser");
        const res = await OnboardingService.get("/test/gettoken");
        setUpToken(res?.accessToken);
        dispatch(loginSuccess(response));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (!isAuthenticated) {
      getCurrentUser();
    } else {
      getSourceMenus(dispatch);
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Loading fullMode={true} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
