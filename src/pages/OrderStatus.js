import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import { SearchBar } from "../components/Home/Search";
import { OrderTracking } from "../components/OrderStatus/OrderTracking";
import { useContext } from "react";
import { UserContext } from "../App";

//import { db } from '../firebase'; // Import the Firestore database instance

function OrderStatusPage() {
    const user = useContext(UserContext);

    return (
        <>
            <Header user={user} />
            <SearchBar />
            <OrderTracking />
            <MoreOptions />
            <Footer />
        </>
    );
}

export default OrderStatusPage;
