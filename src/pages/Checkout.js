import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css";

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || JSON.parse(localStorage.getItem('cart')) || []);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      navigate("/");
    }).catch((error) => {
      console.error("Error signing out: ", error);
      setError("Error signing out. Please try again.");
    });
  };

  const handleKeepShopping = () => {
    navigate("/products", { state: { cart: cart } });
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (currentUser) {
      addCartForUser(currentUser.uid, updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + parseFloat(product.price || 0), 0).toFixed(2);
  };

  const addCartForUser = async (userId, cartItems) => {
    try {
      await setDoc(doc(db, "carts", userId), { items: cartItems });
      console.log("Cart added for user with ID: ", userId);
    } catch (error) {
      console.error("Error adding cart for user: ", error);
    }
  };

  const handleFinalizePurchase = () => {
    console.log("Purchase finalized!");
    setCart([]);
    localStorage.removeItem("cart");
    if (currentUser) {
      setDoc(doc(db, "carts", currentUser.uid), { items: [] }).then(() => {
        console.log("Cart cleared in the database.");
      }).catch((error) => {
        console.error("Error clearing cart in the database:", error);
      });
    }
    alert("Purchase finalized! Thank you for shopping with us!");
  };

  return (
    <>
      <Header />
      <section className="searchBar">
        <i className="fa fa-bars icon" />
        <section id="checkoutBanner">
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
