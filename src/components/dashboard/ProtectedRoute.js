import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import LoadingComponent from "../frontend/LoadingComponent";
import { loginSuccess } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUpToken } from "../../helpers/auth";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user?.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const getTokenUrl = process.env.REACT_APP_BASE_URL;
      const getUserURL = process.env.REACT_APP_SEC_API;

      try {
        const { data } = await axios.get(getTokenUrl + "/GetAuthUser", {
          withCredentials: true,
        });

        setUpToken(data?.accessToken);

        const config = {
          headers: { Authorization: `Bearer ${data?.accessToken}` },
        };

        const response = await axios.get(getUserURL + "/user", config);

        dispatch(loginSuccess(response?.data));
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
