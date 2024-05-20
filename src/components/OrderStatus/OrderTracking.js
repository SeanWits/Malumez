import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'; // Ensure this context provides the logged-in user's information
import { db } from "../../firebase"; // Assuming firebase is properly configured and exported
import { getDocs, query, collection, where } from "firebase/firestore";
import "./OrderTracking.css";
import "../../pages/Dashboard.css";
import "../../pages/home.css";

function OrderInfo({ order }) {
    return (
        <>
            <section className="DashboardArticles OrderTrackingSection">
                <section className="Heading OrderStatusHeadingSection">
                    <h2 className="HeadingText OrderStatusHeading">
                        Order Status
                    </h2>
                </section>

                <section className="OrderProgressionSection">
                    <section className="OrderProgressionStatusSection">
                        <div className="square" id="orderSubmitted">
                            <p className="OrderStatusText">Order Submitted</p>
                        </div>

                        <i className="fa fa-long-arrow-right icon orderStatusArrow" />
                        <div className="square" id="orderConfirmation">
                            <p className="OrderStatusText">
                                {order.status === "confirmed" ? "Order Confirmed" : "Pending Confirmation"}
                            </p>
                        </div>

                        <i className="fa fa-long-arrow-right icon orderStatusArrow" />
                        <div className="square" id="orderAvailable">
                            <p className="OrderStatusText">
                                {order.status === "available" ? "Order Available for collection" : "Not Available"}
                            </p>
                        </div>

                        <i className="fa fa-long-arrow-right icon orderStatusArrow" />
                        <div className="square" id="orderCollected">
                            <p className="OrderStatusText">Order Collected</p>
                        </div>

                        <i className="fa fa-long-arrow-right icon orderStatusArrow" />
                        <div className="square" id="orderClosed">
                            <p className="OrderStatusText">Order Closed</p>
                        </div>
                    </section>

                    <section className="OrderDetailsSection">
                        <section className="Heading OrderStatusHeadingSection">
                            <h3 className="HeadingText OrderDetailsHeading">
                                Order Details
                            </h3>
                        </section>
                        <ul className="OrderDetailsList">
                            <li className="OrderStatusText" id="CartTotal">
                                Cart Total: R{order.total}
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
            <i className="fa fa-arrow-circle-left icon" id="backButton" style={{ display: "none" }}></i>
        </>
    );
}

export function OrderTracking() {
    const user = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState({});

    useEffect(() => {
        if (user) {
            fetchOrders();
            fetchShops();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const ordersQuerySnapshot = await getDocs(
                query(
                    collection(db, "orders"),
                    where("userID", "==", user.uid)
                )
            );

            const ordersData = ordersQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
            console.log("Orders fetched: ", ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    const fetchShops = async () => {
        try {
            const shopsQuerySnapshot = await getDocs(collection(db, "shops"));

            const shopsData = shopsQuerySnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
            }, {});
            setShops(shopsData);
            console.log("Shops fetched: ", shopsData);
        } catch (error) {
            console.error("Error fetching shops: ", error);
        }
    };

    return (
        <article className="OrderTrackingArticle">
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="orderBlock" onClick={() => console.log("Order clicked:", order.id)}>
                        <div className="orderHeader">
                            <h3>Order ID: {order.id}</h3>
                            <p>Total Price: R{order.total}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <ul className="orderItemsList">
                            {order.items.map(item => {
                                const shop = shops[item.shop_id];
                                return (
                                    <li key={item.id} className="orderItem">
                                        <div className="orderItemDetails">
                                            <p>{item.name} - R{item.price} - {item.status}</p>
                                            {shop && (
                                                <>
                                                    <p>Shop Name: {shop.name}</p>
                                                    <p>Location: {shop.location}</p>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No orders found</p>
            )}
        </article>
    );
}
