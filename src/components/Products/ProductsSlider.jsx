import React, { Component } from "react";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <>
      <div className="control-btn" onClick={onClick}>
        <button className="next">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

const PreviousArrow = (props) => {
  const { onClick } = props;
  return (
    <>
      <div className="control-btn" onClick={onClick}>
        <button className="prev">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      </div>
    </>
  );
};

const ProductsSlider = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 8000,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };
  return (
    <>
      <div className="product-slider">
        <Slider {...settings}>
          {props.products.map((item, index) => (
            <div className="product-item px-5">
              <ProductItem
                className="px-5"
                products={item}
                key={index}
              ></ProductItem>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductsSlider;
