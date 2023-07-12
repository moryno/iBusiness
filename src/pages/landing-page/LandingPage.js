import React, { useEffect, useState } from "react";
import { Hero } from "../../components/frontend/hero/Hero";
import { Testimonial } from "../../components/frontend/testimonial/Testimonial";
import Feature from "../../components/frontend/feature/Feature";
import Pricing from "../../components/frontend/pricing/Pricing";
import { logoutUserInfo } from "../../redux/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Loading } from "../../components/frontend/landing-page/Loading";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    async function checkAuthentication() {
      const axiosClient = axios.create({
        baseURL: "https://localhost:5001/",
        withCredentials: true,
      });
      try {
        const { status } = await axiosClient.get("account/isloggedin");
        if (status === 200) {
          console.log("All good.");
          return;
        }
      } catch (ex) {
        dispatch(logoutUserInfo());
      }
    }
    checkAuthentication();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading === false ? (
        <>
          <Hero />
          <Feature />
          <Pricing />
          <Testimonial />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
