// Checkout.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase Firestore instance;
import { setDoc, doc } from "firebase/firestore";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Checkout.css';
const Checkout = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);

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
            setError("Error signing out. Please try again.");
        });
    };

    const handleKeepShopping = () => {
        navigate('/products');
    };
    const handleRemoveFromCart = (index) => {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1); // Remove item at the specified index
      setCart(updatedCart);
  
      // Update cart in local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      if (currentUser) {
          // Update cart in the database
          addCartForUser(currentUser.uid, updatedCart);
      }
  };
  
  
  
    const calculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, product) => {
            return total + (parseFloat(product.price) || 0); // Ensure product.price is a number
        }, 0);

        return totalPrice;
    };

    const addCartForUser = async (userId, cartItems) => {
      try {
          await setDoc(doc(db, "carts", userId), {
              items: cartItems
          });
          console.log("Cart added for user with ID: ", userId);
      } catch (error) {
          console.error("Error adding cart for user: ", error);
      }
  };
  const handleFinalizePurchase = () => {
    // Logic to finalize the purchase
    console.log("Purchase finalized!");
    // You can add your logic to finalize the purchase here

    // Display a short message
    alert("Purchase finalized! Thank you for shopping with us!");
};


    // Use effect to update database when cart items change
    useEffect(() => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(cartItems);
  
      const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
      });
  
      return () => {
          unsubscribe();
      };
  }, []);
  
    return (
        <>
            <Header />
            <section className="searchBar">
                <i className='fa fa-bars icon' />
                <section id='checkoutBanner'>
                    <h2>Checkout</h2>
                </section>
            </section>
            <div className="checkout-container">
                <div className="cart-box">
                    <h2 className="centered-heading">Items in Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="cart-list">
                           {cart.map((product, index) => (
    <li key={product.id} className="cart-item">
        <div className="cart-item-content">
            <span>{product.name} - R{product.price}</span>
            <button onClick={() => handleRemoveFromCart(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    </li>
))}
                        </ul>
                    )}
                </div>
                <div className="checkout-page-box">
                    <h1>Checkout</h1>
                    <div className="checkout-details">
                        <p>Total Price: R{calculateTotalPrice()}</p>
                    </div>
                    <button className="button" onClick={handleKeepShopping}>Continue Shopping</button>
                    <button className="button sign-out-button" onClick={handleSignOut}>Sign Out</button>
                    <button className="finalize-button" onClick={handleFinalizePurchase}>Finalize Purchase</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;