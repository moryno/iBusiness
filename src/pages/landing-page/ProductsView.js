import React from "react";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";
import Pricing from "../../components/frontend/pricing/Pricing";

export const ProductsView = () => {
  return (
    <>
      <Navbar />
      <Pricing />
      <Footer />
      <Copyright />
    </>
  );
};
