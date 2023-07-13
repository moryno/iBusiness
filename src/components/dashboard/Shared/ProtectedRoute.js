import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import LoadingComponent from "../../frontend/LoadingComponent";
import { loginSuccess } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCRSFToken, setUpToken } from "../../../helpers/auth";
import OnboardingService from "../../../ClientServices/onboardingRequest";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user?.currentUser?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getCRSFToken();
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