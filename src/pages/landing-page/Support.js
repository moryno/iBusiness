import React from "react";
import { SupportForm } from "../../components/frontend/landing-page/support/SupportForm";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";
import { Copyright } from "../../components/frontend/copyright/Copyright";

export const Support = () => {
  return (
    <div className="s-form-parent">
      <Navbar />
      <SupportForm />
      <Footer />
      <Copyright />
    </div>
  );
};
