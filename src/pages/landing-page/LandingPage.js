import React, { useEffect, useState } from "react";
import { Hero } from "../../components/frontend/hero/Hero";
import { Testimonial } from "../../components/frontend/testimonial/Testimonial";
import Feature from "../../components/frontend/feature/Feature";
import Pricing from "../../components/frontend/pricing/Pricing";
import { Loading } from "../../components/frontend/landing-page/Loading";

export const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

  }, [])

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
