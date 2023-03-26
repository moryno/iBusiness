import React, { useState } from "react";
import "./products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import data from "../../../data/products";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Products = () => {
  // This piece of code needs some fixes
  const [carousel, setCarousel] = useState(0);

  const handleCarouselRight = () => {
    let slides = document.getElementsByClassName("carousel-slide").length * 25;
    if (carousel <= -slides) {
      setCarousel(0);
    } else {
      setCarousel(carousel - slides);
    }
  };

  const handleCarouselLeft = () => {
    let slides = document.getElementsByClassName("carousel-slide").length * 25;
    if (carousel === 0) {
      setCarousel(-slides);
    } else {
      setCarousel(carousel + slides);
    }
  };

  // End of piece of code

  const items = data.items;
  const chunkSize = 3;

  const chunks = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }

  return (
    <div className="products">
      <h1 className="hero-lgheader">{data.header}</h1>
      <p className="hero-text">{data.content}</p>
      <div className="product-items">
        <button className="btn-previous" onClick={handleCarouselLeft}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          className="products-div"
          id="products-div"
          style={{ transform: `translate(${carousel}%` }}
        >
          {chunks.map((chunk, index) => (
            <div className="carousel-slide" key={index}>
              {chunk.map((item) => (
                <div className="product-item" key={item.title}>
                  <div className="products-img">
                    <LazyLoadImage
                      src={item.icon}
                      className="products-image"
                      alt="Bannerimage"
                    />
                  </div>
                  <p className="prod-ico-title">{item.title}</p>
                  <h6 className="prod-ico-subtitle">{item.description}</h6>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="btn-next" onClick={handleCarouselRight}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};
