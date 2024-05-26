import React, { useEffect, useState } from "react";
import "../../pages/products.css";
import { db } from "../../firebase"; // Assuming firebase is imported correctly
import { collection, getDocs, query, where } from "firebase/firestore";
import "../../pages/Dashboard.css";
import "../OrderStatus/OrderTracking.css"
import "../../pages/Seller.css"

export function ShopDetails({ user }) {
    const [shopDetails, setShopDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                if (user) {
                    const shopsQuerySnapshot = await getDocs(
                        query(
                            collection(db, "shops"),
                            where("owner_id", "==", user.uid)
                        )
                    );

                    if (!shopsQuerySnapshot.empty) {
                        const shopDoc = shopsQuerySnapshot.docs[0];
                        const shopData = { id: shopDoc.id, ...shopDoc.data() };
                        setShopDetails(shopData);
                        setErrorMessage(""); // Clear any previous error messages
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
                setErrorMessage("Error fetching shop data.");
                console.error("Error fetching shop data:", error);
            }
        };
        fetchShopData();
    }, [user]);

    return (
        <>
            <section className="DashboardArticles ShopDetailsSection">
                <section className="shopDetailsHeadingSection Heading">
                    <h2 className="shopDetailsHeading HeadingText">Shop Details</h2>
                </section>
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
