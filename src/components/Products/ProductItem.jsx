import React from "react";
import Rating from "./Rating";
import "./styles/ProductItem.css";
import { Link } from "react-router-dom";
import {formattedNumber} from "../../configs/Methods"

const ProductItem = (props) => {
  const products = props.products;
  
  return (
    <>
      <div className="product-item-container border border-gray-light shadow-md">
        <div className="product-wrapper overflow-hidden relative">
          <div className="product-sale-tag">
            <span className="sale-tag font-josefin">{products.discount}%</span>
          </div>
          <div className="product-image overflow-hidden h-72">
            <Link to={`/products/${products.id}`} className="product-link relative">
              <img
                src={products.thumbnail}
                alt="product_img"
                className="object-cover main-img"
              ></img>
            </Link>
          </div>
          <div className="product-button">
            <button className="compare">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
            </button>
           
          </div>
          <div className="product-info">
            <div className="product-info-wrapper">
              <div className="rating_liked flex">
                <div className="rating flex justify-start w-3/4 pl-2">
                  <Rating rating={products.rating}></Rating>
                  <span className="text-gray-dark">({products.rating === null? 0 : products.rating.toFixed(1)})</span>
                </div>
                <div className="like flex justify-end w-1/4 pr-2">
                   <span><i class="fa-regular fa-thumbs-up mx-2"></i></span>
                  <span className="text-gray-dark">({products.total_liked})</span>
                </div>
              </div>

              <div className="product-name font-josefin text-xl py-2">
                <Link
                  to={`/products/${products.id}`}
                  className="product-link block text-center text-xl font-opensans"
                >
                  {products.name}
                </Link>
              </div>
              <div className="price-product flex gap-x-5">
                <div className="price-regular font-josefin w-1/2 text-center pl-2  text-gray-dark">
                  <span className="line-through">{formattedNumber(products.price)}</span> 
                  <span className="px-1 text-sm">VNĐ</span>
                </div>
             
                <div className="price-on-sale font-josefin w-1/2 pr-2 text-red text-[18px] text-center">
                {formattedNumber(
                    products.price - (products.price * products.discount) / 100
                  )}
                  <span className="px-1 text-sm">VNĐ</span>    
                
                </div>
              </div>
            </div>
          </div>
          {/* <div className="product-view-detail">
            <Link
             to={`/products/${products.id}`}
              className="view-detail-link block text-center font-josefin uppercase tracking-wide py-2 border font-bold"
            >
              Xem chi tiết
            </Link>
          </div> */}
          <div className="product-buy w-full">
            <Link to={`/products/${products.id}`} className="btn-buy-now block text-center py-3 uppercase w-full border-t-2 border-gray-light font-josefin font-semibold">Mua ngay</Link>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default ProductItem;
