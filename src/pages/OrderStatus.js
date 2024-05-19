import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import { SearchBar } from "../components/Home/Search";
import OrderTracking from "../components/OrderStatus/OrderTracking";
import { useEffect, useState } from "react";
//import { db } from '../firebase'; // Import the Firestore database instance


function OrderStatus() {
 
}

function OrderStatusPage() {
    return (
        <>
            <Header />
            <SearchBar />
            <OrderTracking />
            {/* <OrderStatus/> */}
            <MoreOptions />
            <Footer />
        </>
    );
}

export default OrderStatusPage;
