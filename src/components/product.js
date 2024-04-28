import React from 'react';
import './product.css';

const Product = ({ imageUrl, price, name }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />
      <div className="product-info">
        <h2>{name}</h2>
        <p>R{price}</p>
      </div>
    </div>
  );
};

export default Product;
