import React from "react";
import data from "../data";
import ProductCardsDisplay from "./ProductCardsDisplay";

const FeaturedDisProducts = () => {
  const products = data.map((item) => {
    return <ProductCardsDisplay key={item.id} value={item} />;
  });
  return <div className="ProductCard-conatiner">{products}</div>;
};

export default FeaturedDisProducts;