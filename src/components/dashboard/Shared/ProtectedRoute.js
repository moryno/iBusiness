import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import LoadingComponent from "../../frontend/LoadingComponent";
import {
  loginSuccess,
  logoutUserInfo,
} from "../../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCRSFToken, setUpToken } from "../../../helpers/auth";
import OnboardingService from "../../../ClientServices/onboardingRequest";
import Constant from "../../../utils/constant";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user?.currentUser?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getCRSFToken();
  }, []);

  useEffect(() => {
    async function checkAuthentication() {
      const axiosClient = axios.create({
        baseURL: "https://localhost:5001/",
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

    // eslint-disable-next-line
  }, []);

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

    if (!isAuthenticated) getCurrentUser();
  }, [dispatch, isAuthenticated]);

  if (isLoading && !isAuthenticated) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
