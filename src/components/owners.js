import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

function Owners() {
    const [shopsData, setShopsData] = useState([]);

    useEffect(() => {
        const fetchShopsData = async () => {
            try {
                // Query all documents from the "shops" collection
                const querySnapshot = await getDocs(collection(db, "shops"));
                const data = [];

                // Iterate over the documents and extract the data
                querySnapshot.forEach((doc) => {
                    const { name, email, location, contact, owner_name } = doc.data();
                    data.push({ name, email, location, contact, owner_name });
                });

                // Set the extracted data to state
                setShopsData(data);
            } catch (error) {
                console.error("Error fetching shops data:", error);
            }
        };

        // Call the fetchShopsData function when the component mounts
        fetchShopsData();

        // Cleanup function (optional)
        return () => {
            // Perform cleanup if necessary
        };
    }, []);

    return (
        <div>
            {/* Your Owners component JSX here */}
        </div>
    );
}

export default Owners;
