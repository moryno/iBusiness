import React from "react";
import { Card } from "../../components/frontend/landing-page/SignIn/SignInCard";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";

export const SignIn = () => {
  return (
    <main>
      <Navbar />
      <Card />
      <Copyright />
    </main>
  );
};
