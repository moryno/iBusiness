import React from "react";
import { SupportForm } from "../../components/frontend/landing-page/support/SupportForm";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";

export const Support = () => {
  return (
    <>
      <Navbar />
      <SupportForm />
      <Footer />
    </>
  );
};
