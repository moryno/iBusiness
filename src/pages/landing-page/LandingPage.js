import React from "react";
import { Hero } from "../../components/frontend/hero/Hero";
import { Products } from "../../components/frontend/products/Products";
import { About } from "../../components/frontend//about/About";
import { Testimonial } from "../../components/frontend/testimonial/Testimonial";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";
import Feature from "../../components/frontend/feature/Feature";
import Pricing from "../../components/frontend/pricing/Pricing";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <Testimonial />
      <Footer />
      <Copyright />
    </>
  );
};
