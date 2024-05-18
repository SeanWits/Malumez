import React, { useEffect, useState } from 'react';
import "../../pages/products.css";
import { auth, db } from '../../firebase'; // Assuming firebase is imported correctly
import { collection, getDocs, query, where } from "firebase/firestore";

export function ShopDetails() {
  const [shopDetails, setShopDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const shopsQuerySnapshot = await getDocs(query(collection(db, "shops"), where("owner_id", "==", user.uid)));

          if (!shopsQuerySnapshot.empty) {
            const shopDoc = shopsQuerySnapshot.docs[0];
            const shopData = { id: shopDoc.id, ...shopDoc.data() };
            setShopDetails(shopData);
            console.log("Shop Data:", shopData);
          } else {
            setErrorMessage("No shop found for the current user.");
            console.log("No shop found for the current user.");
          }
        } else {
          setErrorMessage("User is not logged in.");
          console.log("User is not logged in.");
        }
      } catch (error) {
        setErrorMessage('Error fetching shop data.');
        console.error('Error fetching shop data:', error);
      }
    };
    fetchShopData();
  }, []);

  return (
    <>
      <section id="filters" className="shopDetails">
        <h2 className="shopDetailsHeading">Shop Details</h2>
        {errorMessage && <p>{errorMessage}</p>}
        {shopDetails && (
          <ul className="shopDetails">
            <li>Shop Name: {shopDetails.name}</li>
            <li>Shop Location: {shopDetails.location}</li>
            <li>Shop Owner: {shopDetails.owner_name}</li>
            <li>Shop Contact Details: {shopDetails.contact}</li>
          </ul>
        )}
      </section>
    </>
  );
}
