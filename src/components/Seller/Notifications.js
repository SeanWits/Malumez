import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";

export default function Notifications() {
  return (
    <>
      <Header />
      <section className="notificationHeadingSection">
        <h2 className="notificationHeading">Notifications</h2>
      </section>
      <section className="orderNotification">
        <section className="orders">
          <h3 className="orderHeading">Order</h3>
        </section>
        <section className="buttonSection">
          <button className="acceptButton">Accept</button>
          <button className="waitingButton">Waiting for stock</button>
          <button className="deleteButton">Delete</button>
        </section>
      </section>
      <Footer />
    </>
  );
}
