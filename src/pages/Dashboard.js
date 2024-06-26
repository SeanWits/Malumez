import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import UserDetails from "../components/Dashboard/UserDetails";
import { UserContext } from "../App";
import OrderHistory from "../components/Dashboard/OrderHistory";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import "./Dashboard.css";

export default function Dashboard() {
    const user = useContext(UserContext);
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully.");
            navigate("/login"); // Redirect to login page or home page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <Header user={user}/>
            <section className="DashboardSection">
                <article className="Dashboard">
                    <section className="UserViewSection">
                        <UserDetails user={user} />
                        <OrderHistory />
                    </section>
                    <button type="button" id="logout" className="button" onClick={handleLogout}>
                        Logout
                    </button>
                </article>
            </section>
            <MoreOptions />
            <Footer />
        </>
    );
}
