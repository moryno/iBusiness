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
        document.getElementById("nav-mobile").style.right = "0";
      });
      document.getElementById("nav-mobile").style.display = "";

      setToggleNav(true);
    } else {
      document.getElementById("nav-mobile").style.right = "100vw";
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
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: "1.2rem",
        }}
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
          <Link to={data.signuptext.to}>
            <button className="nav-button">
              <FontAwesomeIcon icon={faUser} />
              &nbsp; {data.signuptext.value}
            </button>
          </Link>
          <Link to={data.actionbutton.to} id="br-link">
            {" "}
            <button className="nav-styled-button">
              {data.actionbutton.value}
            </button>
          </Link>
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
