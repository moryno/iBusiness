import React from "react";
import "./hero.css";
import illustration from "../../../assets/illustrations/1.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import data from "../../../data/hero";
import { Link } from "react-router-dom";
import { msSingleSign } from "../../../utils/webService";

export const Hero = () => {
  return (
    <div className="hero-content">
      <div className="info">
        <h1 className="landing-header">{data.title}</h1>
        <p className="lander-page-subtitle">{data.subtitle}</p>
        {/* <form>
          <input
            type="email"
            className="hero-form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <Link to="/get-started" className="hero-landing-btn">
            <Landingbutton value="Sign up" />
          </Link>
        </form> */}
        <button className="heroGetStarted">
          <Link to={msSingleSign}>
            Get Started
          </Link>
        </button>
      </div>
      <div className="hero-image-div">
        <LazyLoadImage
          src={illustration}
          className="hero-image"
          alt="Bannerimage"
        />
      </div>
    </div>
  );
};
