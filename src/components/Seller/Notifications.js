import Header from "./Header";
import React, { useEffect, useState, useContext } from "react";
import { Footer } from "../Home/Footer";
import { UserContext } from "../../App";
import { db } from "../../firebase";
import {
    getDocs,
    query,
    collection,
    where,
    updateDoc,
    doc,
} from "firebase/firestore";
import "./Notifications.css";
import { format } from "date-fns";

function OrderNotification({ order, shopId, fetchOrders }) {
    const updateProductStatus = async (orderId, productId, newStatus) => {
        try {
            const orderDocRef = doc(db, "orders", orderId);
            const updatedItems = order.items.map((item) =>
                item.id === productId ? { ...item, status: newStatus } : item
            );

            await updateDoc(orderDocRef, { items: updatedItems });
            console.log("Order status updated.");
            fetchOrders(); // Refresh orders after update
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <>
            <section className="orderNotificationItem DashboardArticles">
                <section className="orderHeadingSection Heading">
                    <h3 className="orderHeading">Order - {order.username}</h3>
                </section>
                <section className="orderInfoSection">
                    <section className="orderDetails">
                        <ul className="orderDetailsList">
                            <li className="orderListItem">
                                Order Date:{" "}
                                {order.dateOrdered
                                    ? format(
                                          order.dateOrdered.toDate(),
                                          "dd MMM yyyy, HH:mm:ss"
                                      )
                                    : "N/A"}
                            </li>
                            <li className="orderListItem">Total Price: R{order.total}</li>
                        </ul>
                    </section>
                    <section className="orderDetails">
                        <ul className="orderDetailsList">
                            {order.items
                                .filter((item) => item.shop_id === shopId)
                                .map((product) => (
                                    <li key={product.id} className="orderListItem orderItem">
                                        <span className="orderSpan">
                                            {product.name} - R{product.price} -{" "}
                                            {product.status}
                                        </span>
                                        <select
                                            value={product.status}
                                            onChange={(e) =>
                                                updateProductStatus(
                                                    order.id,
                                                    product.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="ordered">
                                                Ordered
                                            </option>
                                            <option value="packing">
                                                Packing
                                            </option>
                                            <option value="ready_to_collect">
                                                Ready to Collect
                                            </option>
                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </li>
                                ))}
                        </ul>
                    </section>
                </section>
            </section>
        </>
    );
}

export default function Notifications() {
    const user = useContext(UserContext);
    const [shopId, setShopId] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchShopId();
    }, [user]);

    const fetchShopId = async () => {
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
                    const shopId = shopDoc.id;
                    setShopId(shopId);
                    console.log("Shop ID:", shopId);

                    // Fetch orders after setting shopId
                    fetchOrders(shopId);
                } else {
                    console.log("No shop found for the current user.");
                }
            } else {
                console.log("User is not logged in.");
            }
        } catch (error) {
            console.error("Error fetching shop ID:", error);
        }
    };

    const fetchOrders = async (shopId) => {
        try {
            const ordersQuerySnapshot = await getDocs(
                query(
                    collection(db, "orders"),
                    where("shops", "array-contains", shopId)
                )
            );

            const ordersData = ordersQuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
            console.log("Orders fetched: ", ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    return (
        <>
            <Header />
            <section className="notificationHeadingSection Heading">
                <h2 className="notificationHeading">Notifications</h2>
            </section>
            <section className="orderNotification">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderNotification
                            key={order.id}
                            order={order}
                            shopId={shopId}
                            fetchOrders={() => fetchOrders(shopId)}
                        />
                    ))
                ) : (
                    <p className="noNotifications">No notifications</p>
                )}
            </section>
            <Footer />
        </>
    );
}
