import React, { useState } from "react";
import Brand from "../UI/Brand";
import { Navbutton } from "../UI/Button";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faTimes,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import data from "../../../data/navbar";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [toggleSidebar, setToggleNav] = useState(false);

  const handleToggle = () => {
    if (toggleSidebar === false) {
      setTimeout(() => {
        document.getElementById("nav-mobile").style.left = "0";
      });
      document.getElementById("nav-mobile").style.display = "";

      setToggleNav(true);
    } else {
      document.getElementById("nav-mobile").style.left = "100vw";
      setTimeout(() => {
        document.getElementById("nav-mobile").style.display = "none";
      }, 500);
      setToggleNav(false);
    }
  };

  return (
    <>
      <div className="nav-mobile" id="nav-mobile">
        <div className="nav-mobile-content">
          {data.navmobilecontent.links.map((link) => (
            <Link
              key={link.key}
              className="nav-mobile-route"
              onClick={handleToggle}
              to={link.to}
            >
              <button className="nav-mobile-link">
                {link.value}
                <span className="nav-mobile-icon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="navbar"
      >
        <div className="brand">
          <Link to="/" className="brand-logo">
            <Brand className="brand-logo" />
          </Link>
          {data.navlinks.map((link) => (
            <Link to={link.to} key={link.key}>
              <Navbutton className="brand-left" value={link.value} />
            </Link>
          ))}
        </div>
        <div className="brand-links">
          <a href={data.signuptext.to}>
            <button className="nav-signin-button">
              {data.signuptext.value}
            </button>
          </a>
          <FontAwesomeIcon
            icon={toggleSidebar ? faTimes : faBars}
            id="burger"
            onClick={handleToggle}
          />
        </div>
      </div>
    </>
  );
};
