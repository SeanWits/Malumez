import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
        console.log(user);
      } else {
        // No user is signed in.
        setCurrentUser(null);
        navigate('/'); // Redirect to sign-up page if not signed in
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth listener when component unmounts
    };
  }, [navigate]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      setCurrentUser(null);
      navigate('/'); // Redirect to sign-up page after sign-out
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out: ", error);
    });
  };
  const handleNavigateToCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : null}
      <button onClick={handleNavigateToCheckout}>Go to Checkout</button>
    </div>
  );
};

export default Home;
