import React from "react";
import { Hero } from "../../components/frontend/hero/Hero";
import { Testimonial } from "../../components/frontend/testimonial/Testimonial";
import { Footer } from "../../components/frontend/footer/Footer";
import Feature from "../../components/frontend/feature/Feature";
import Pricing from "../../components/frontend/pricing/Pricing";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Pricing />
      <Testimonial />
      <Footer />
    </>
  );
};
