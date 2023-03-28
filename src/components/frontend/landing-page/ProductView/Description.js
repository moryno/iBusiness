import React from "react";
import "./description.css";
import { Products } from "../../products/Products";
import data from "../../../../data/pages/product";

export const Description = () => {
  return (
    <div className="description">
      <p className="desc-header">{data.header}</p>
      <p className="desc-text">{data.description}</p>
      <div className="features">
        <div className="feature-left">
          <p className="feature-header">{data.feature1_header}</p>
          <p className="feature-text">{data.feature1_desc}</p>
        </div>
        <div className="feature-right">
          <p className="feature-header">{data.feature2_header}</p>
          <p className="feature-text">{data.feature2_desc}</p>
        </div>
      </div>
      <Products />
    </div>
  );
};
