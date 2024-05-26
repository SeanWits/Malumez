import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import { MoreOptions } from "../Home/More_Options";
import "./OrderHistory.css";
import { jsPDF } from "jspdf";

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
                where("userID", "==", uid),
                where("status", "==", "complete")
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

    const downloadPDF = () => {
        const doc = new jsPDF();
        let yOffset = 10;

        doc.text("Order History", 10, yOffset);
        yOffset += 10;

        orders.forEach((order, index) => {
            doc.text(`Order ID: ${order.id}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Date: ${order.dateOrdered.toDate().toLocaleDateString()}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Total: R${order.total}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Status: ${order.status}`, 10, yOffset);
            yOffset += 10;
            doc.text("Items:", 10, yOffset);
            yOffset += 10;

            order.items.forEach((item) => {
                doc.text(`${item.name} - ${item.quantity} x R${item.price}`, 20, yOffset);
                yOffset += 10;
            });

            if (index < orders.length - 1) {
                yOffset += 10; // Add extra space between orders
            }
        });

        doc.save("order_history.pdf");
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
                <section className="OrderHistoryList">
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
                </section>
                <button onClick={downloadPDF} className="download-btn">
                    Download Order History
                </button>
            </main>
            {/* <MoreOptions /> */}
            {/* <Footer /> */}
        </>
    );
};

export default OrderHistory;
