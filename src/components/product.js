import React from 'react';
import './product.css';

const Product = ({ imageUrl, name, price, quantity, onIncreaseQuantity, onDecreaseQuantity }) => {
  // Ensure price is a number
  const formattedPrice = Number(price).toFixed(2);

  return (
    <div className="product">
      <img src={imageUrl} alt={name} className="product-image" />
      <h2 className="product-name">{name}</h2>
      <p className="product-price">R{formattedPrice}</p>
      <div className="product-quantity">
        <button className="quantity-button" onClick={onDecreaseQuantity} data-testid="decrease-quantity">-</button>
        <span>{quantity}</span>
        <button className="quantity-button" onClick={onIncreaseQuantity} data-testid="increase-quantity">+</button>
      </div>
    </div>
  );
};

export default Product;
