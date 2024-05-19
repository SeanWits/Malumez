import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import UserDetails from "../components/Dashboard/UserDetails";
import { UserContext } from "../App";
import { useContext } from "react";
import OrderHistory from "../components/Dashboard/OrderHistory";
import Checkout from "./Checkout";
export default function Dashboard() {
    const user = useContext(UserContext);
    return (
        <>
            <Header />
            <section className="Dashboard">
                <UserDetails user={user} />
                <OrderHistory />
                <button
                    type="button"
                    id="logout"
                    onClick={Checkout.handleSignOut}
                >
                    Logout
                </button>
            </section>
            <MoreOptions />
            <Footer />
        </>
    );
}
