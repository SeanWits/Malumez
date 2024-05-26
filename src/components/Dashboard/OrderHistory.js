import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { MoreOptions } from "../Home/More_Options";
import "./OrderHistory.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                fetchOrders(user.uid);
            }
        });
        return unsubscribe;
    }, []);

    const fetchOrders = async (uid) => {
        setLoading(true);
        try {
            const q = query(
                collection(db, "orders"),
                where("userID", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return typeof price === "number" ? price.toFixed(2) : "0.00";
    };

    return (
        <>
            {/* <Header /> */}
            <main className="order-history-container DashboardArticles">
                <section className="Heading">
                    <h2 className="HeadingText">Order History</h2>
                </section>
                {loading && <p className="loading">Loading...</p>}
                {!loading && orders.length === 0 && <p>No orders found.</p>}
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>
                                <strong>Order ID:</strong> {order.id}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {order.dateOrdered
                                    .toDate()
                                    .toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Total:</strong> R{order.total}
                            </p>
                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                                <strong>Items:</strong>
                            </p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.quantity} x R
                                        {item.price}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </main>
            {/* <MoreOptions /> */}
            {/* <Footer /> */}
        </>
    );
};

export default OrderHistory;
