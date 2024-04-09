import React from 'react';
import data from '../ProductsData'
import ProductCardsDisplay from "./ProductCardsDisplay";

const LatestUploads = () => {
    const products = data.map((item) => {
        return <ProductCardsDisplay key={item.id} value={item} />;
      });
      return (
        <div className='latestUploads-container'>
          <div className="ProductCard-conatiner">{products}</div>
          <button className='viewAll-btn'>View All Uploads</button>
        </div>
      );
}

export default LatestUploads;