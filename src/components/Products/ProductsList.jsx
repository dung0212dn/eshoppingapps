import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = (props) => {
 const products = props.products;
 
  return (
    <>
      <div class="product-list-container grid grid-cols-4 gap-x-8 gap-y-4  ">
        {props.products.map((item, index) => (
          <ProductItem key={index} products={item}></ProductItem>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
