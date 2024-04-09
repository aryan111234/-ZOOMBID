import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarIcon from "../images/hatchback-car-icon.png";
import BikeIcon from "../images/bike-motorcycle-icon.png";
import Title from "./Title";

const Categories = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Title content="Browse By Category" />
      <div className="carousel">
        <Carousel responsive={responsive}>
          <div className="carousel-card">
            <img src={BikeIcon} alt="Bike" />
            <h3 className="categories-title">Bike</h3>
          </div>
          <div className="carousel-card">
            <img src={CarIcon} alt="Car" />
            <h3 className="categories-title">Car</h3>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Categories;
