import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";

function OrderStatus() {

    console.log("We have reached the order Status page");

    // we need to get the orders from the database

    return (
    <>
        <section>
        <h1>Order Status</h1>
        </section>
        
        <h2>Orders</h2>

    

    </>  
    );
}

function OrderStatusPage() {
    return (
        <>
        <Header />
        <OrderStatus/>
        <MoreOptions />
        <Footer />
    </>
    );
  }
  
  export default OrderStatusPage;
