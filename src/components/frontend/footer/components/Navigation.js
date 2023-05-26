import React, { useRef, useEffect } from "react";
import data from "../../../../data/footer";
import { Link } from "react-router-dom";
import Brand from "../../UI/Brand";

export const Navigation = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [scrollRef]);
  return (
    <div className="navigation">
      {/* <h4 className="footer-header">{data.navlinks.title}</h4>
      <br></br> */}
      {/* <div className="navigation-links">
        {data.navlinks.links.map((link) => (
          <Link
            to={link.to}
            className="navigation-link"
            ref={scrollRef}
            key={link.key}
          >
            {link.value}
          </Link>
        ))}
      </div> */}
      <div className="navigation-area">
        <div className="nav-area">
          <h3>New here?</h3>
          <ul>
            <li>Pricing</li>
            <li>FAQ</li>
            <li>Products</li>
            <li>Documentation</li>
            <li>Features</li>
            <li>Privacy policy</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="nav-area">
          <h3>About iBusiness</h3>
          <ul>
            <li>Our story</li>
            <li>Testimonials</li>
            <li>Clients</li>
            <li>FAQ</li>
            <li>Demos</li>
            <li>Email us</li>
            <li>Terms of service</li>
          </ul>
        </div>
        <div className="nav-area">
          <h3>Popular links</h3>
          <ul>
            <li>Home</li>
            <li>Sign up/in</li>
            <li>Help & support</li>
            <li>Get started</li>
            <li>About the company</li>
            <li>Contact us</li>
            <li>Pricing</li>
          </ul>
        </div>
      </div>
      <div className="nav-copy">
        <Link to="/" className="brand-logo">
          <Brand className="brand-logo" />
        </Link>
        <p className="nav-copy-h">&copy; {data.navlinks.copy}</p>
      </div>
    </div>
  );
};
