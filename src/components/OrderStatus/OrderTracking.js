import "./OrderTracking.css";
import { useEffect, useState } from "react";
//import { db } from '../firebase';

export function OrderTracking() {
    const [order, setOrder] = useState();

    const orderConfirmationStatus = "Pending Confirmation";
    // the order/ cart the person has clicked should be populated from here

    return (
        <>
            <article className="OrderTrackingArticle">
                <section className="OrderTrackingSection">
                    <section className="Heading OrderStatusHeadingSection">
                        <h2 className="HeadingText OrderStatusHeading">Order Status</h2>
                    </section>

                    <section className="OrderProgressionSection">
                        <section className="OrderProgressionStatusSection">
                            <div className="square" id="orderSubmitted">
                                <p className="OrderStatusText">
                                    Order Submitted
                                </p>
                            </div>

                            <i className="fa fa-long-arrow-right icon" />
                            <div className="square" id="orderConfirmation">
                                <p className="OrderStatusText">
                                    {orderConfirmationStatus}
                                </p>
                            </div>

                            <i className="fa fa-long-arrow-right icon" />
                            <div className="square" id="orderAvailable">
                                <p className="OrderStatusText">
                                    Order Available for collection
                                </p>
                            </div>

                            <i className="fa fa-long-arrow-right icon" />
                            <div className="square" id="orderCollected">
                                <p className="OrderStatusText">
                                    Order Collected
                                </p>
                            </div>

                            <i className="fa fa-long-arrow-right icon" />
                            <div className="square" id="orderClosed">
                                <p className="OrderStatusText">Order Closed</p>
                            </div>
                        </section>
                        <section className="OrderProgressionSection">
                            <section className="Heading OrderStatusHeadingSection">
                                <h3 className="HeadingText OrderDetailsHeading">
                                    Order Details
                                </h3>
                            </section>
                            <section className="OrderDetailsSection">
                                <ul className="OrderDetailsList">
                                    <li
                                        className="OrderStatusText"
                                        id="CartTotal"
                                    >
                                        Cart Total:
                                    </li>
                                    <li id="ShopDetails">
                                        Shop Details:
                                        <li id="ShopName">Name:</li>
                                        <li id="Location">Location:</li>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </section>
                </section>
            </article>
        </>
    );
}
