import React from "react";
import { Header } from "../../components/frontend/landing-page/company/Header";
import { CompanyInfo } from "../../components/frontend/landing-page/company/CompanyInfo";
import { Footer } from "../../components/frontend/footer/Footer";
import { Navbar } from "../../components/frontend/navbar/Navbar";

export const Company = () => {
  return (
    <>
      <Navbar />
      <Header />
      <CompanyInfo />
      <Footer />
    </>
  );
};
