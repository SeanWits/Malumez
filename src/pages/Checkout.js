// Checkout.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css'; // Import the CSS file for styling

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  //console.log("CheckOut items:", location.state);
  const cartItems = location.state;

  useEffect(() => {
    const dummyCartProducts = [
      { id: 1, name: "Product 1", price: 10, quantity: 2 },
      { id: 2, name: "Product 2", price: 20, quantity: 1 },
      { id: 3, name: "Product 3", price: 30, quantity: 3 }
    ];
    setCartProducts(dummyCartProducts);

    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const handleKeepShopping = () => {
    navigate('/');
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="checkout-container">
      <div className="cart-box">
      <h2 class="centered-heading">Items in cart</h2>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cartProducts.map(product => (
              <li key={product.id} className="cart-item">
                <span>{product.name}</span> - <span>${product.price}</span> - <span>Quantity: {product.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="checkout-page-box">
        <h1>Checkout</h1>
        <div className="checkout-details">
          <p>Total Quantity: {cartProducts.reduce((total, product) => total + product.quantity, 0)}</p>
          <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
        <button className="button" onClick={handleKeepShopping}>Keep Shopping</button>
        {currentUser && (
          <button className="button" onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
