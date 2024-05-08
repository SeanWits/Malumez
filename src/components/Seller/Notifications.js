import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./Notifications.css";

function OrderNotification() {
    return (
        <>
            <h3 className="orderHeading">Order</h3>
            <section className="orderInfoSection">
                <section className="orders">
                    <ul className="orderDetailList"></ul>
                </section>
                <section className="buttonSection">
                    <button className="acceptButton">Accept</button>
                    <button className="waitingButton">Waiting for stock</button>
                    <button className="deleteButton">Delete</button>
                </section>
            </section>
        </>
    );
}

export default function Notifications() {
    return (
        <>
            <Header />
            <section className="notificationHeadingSection">
                <h2 className="notificationHeading">Notifications</h2>
            </section>
            <section className="orderNotification">
                {/* <OrderNotification /> */}
                <p className="noNotifications">No notifications</p>
            </section>
            <Footer />
        </>
    );
}
