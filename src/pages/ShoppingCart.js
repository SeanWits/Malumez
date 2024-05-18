import React from 'react';
import { Link } from 'react-router-dom';

// the format of a shopping cart 
const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
};

export default ShoppingCart;
