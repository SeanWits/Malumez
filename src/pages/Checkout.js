import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";




const Checkout = () => {
   // eslint-disable-next-line 
  const [currentUser, setCurrentUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cartItems = location.state || []; // Moved inside the useEffect callback
    console.log("Cart Items:", cartItems);
    setCartProducts(cartItems);

    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [location.state]); // Moved cartItems inside the useEffect dependency array


  const handleSignOut = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const handleKeepShopping = () => {
    navigate('/products', { replace: false }); // Navigate to the products page without replacing the current entry in the history stack
  };
  
  
  
  const calculateTotalPrice = () => {
    const totalPrice = cartProducts.reduce((total, product) => {
      // Check if the product has a valid price
      if (typeof product.price === 'number' && !isNaN(product.price)) {
        // Check if the product has a valid quantity
        if (typeof 1 === 'number' && !isNaN(1)) {
          return total + (product.price * 1);
        } else {
          console.error(`Invalid quantity for product ${product.id}: ${1}`);
          return total;
        }
      } else {
        console.error(`Invalid price for product ${product.id}: ${product.price}`);
        return total;
      }
    }, 0);
  
    console.log("Total Price:", totalPrice);
    return totalPrice;
  };
  
  return (
    <>
    <section className="searchBar">
          <i className='fa fa-bars icon'/>
        
        <section id='checkoutBanner'>
          <h2>Checkout</h2>
        </section>
      </section>
      <div className="checkout-container">
        <div className="cart-box">
          <h2 className="centered-heading">Items in Cart</h2>
          {cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cartProducts.map(product => (
                <li key={product.id} className="cart-item">
                  {product.name} - R{product.price}
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

            <button className="button sign-out-button" onClick={handleSignOut}>Go to home</button>
       
        </div>
      </div>
    </>
  );
};

function CheckoutPage() 
{
  return (
  <>
    <Header />
    <Checkout/>
    <Footer />  
  </>
  )
}

export default CheckoutPage;
