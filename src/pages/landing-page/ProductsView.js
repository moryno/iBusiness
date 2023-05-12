import React from "react";
import { Footer } from "../../components/frontend/footer/Footer";
import { Description } from "../../components/frontend/landing-page/ProductView/Description";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";

export const ProductsView = () => {
  return (
    <>
      <Navbar />
      <Description />
      <Footer />
      <Copyright />
    </>
  );
};
