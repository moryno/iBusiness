import React from "react";
import { Hero } from "../../components/frontend/hero/Hero";
import { Products } from "../../components/frontend/products/Products";
import { About } from "../../components/frontend//about/About";
import { Testimonial } from "../../components/frontend/testimonial/Testimonial";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Testimonial />
      <Footer />
      <Copyright />
    </>
  );
};
