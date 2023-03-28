import React from "react";
import "./testimonial.css";
import data from "../../../data/testimonial";
import TestimonyItem from "./TestimonyItem";

export const Testimonial = () => {
  return (
    <div className="testimonial">
      <div className="test-main">
        <h4 className="hero-header">{data.testimony.title}</h4>
        <h1 className="hero-lgheader test-text">{data.testimony.subtitle}</h1>
        <p className="about-p">{data.testimony.description}</p>
      </div>
      <TestimonyItem />
    </div>
  );
};
