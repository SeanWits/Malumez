import React from 'react';
import './product.css';

const Product = ({ imageUrl, name, price, quantity, onIncreaseQuantity, onDecreaseQuantity }) => {
  // Ensure price is a number
  const formattedPrice = Number(price).toFixed(2);

  return (
    <div className="product">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">R{formattedPrice}</p>
        <div className="product-quantity">
          <button className="quantity-button" onClick={onDecreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button className="quantity-button" onClick={onIncreaseQuantity}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
