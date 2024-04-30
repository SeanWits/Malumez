import React from 'react';
import './product.css';

const Product = ({ imageUrl, price, name, onAddToCart, onRemoveFromCart }) => {
  return (
      <div className="product">
          <img src={imageUrl} alt={name} />
          <div className="product-info">
              <h2>{name}</h2>
              <p>R{price}</p>
              <div className="button-container">
                  <button className="add-to-cart-btn" onClick={onAddToCart}>+</button>
                  <button className="remove-from-cart-btn" onClick={onRemoveFromCart}>-</button>
              </div>
          </div>
      </div>
  );
};

export default Product;
