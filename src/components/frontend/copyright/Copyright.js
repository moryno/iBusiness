import React from "react";
import data from "../../../data/landing-page/copyright";
import copy from "../../../data/landing-page/footer";
import "./copyright.css";

export const Copyright = () => {
  return (
    <div className="copyright">
      <div className="copyright-left">
        {data.map((link) => (
          <a href={link.to} key={link.value} className="copyright-link">
            {link.value}
          </a>
        ))}
      </div>
      <div className="copyright-right">&copy; {copy.copyright.subtitle}</div>
    </div>
  );
};
