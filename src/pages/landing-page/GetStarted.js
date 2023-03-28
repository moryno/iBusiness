import React from "react";
import { GetStarted } from "../../components/frontend/landing-page/getstarted/GetStarted";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";

export const SignUp = () => {
  return (
    <>
      <Navbar />
      <GetStarted />
      <Copyright />
    </>
  );
};
