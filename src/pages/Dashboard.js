import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import UserDetails from "../components/Dashboard/UserDetails";

export default function Dashboard() {
    return (
        <>
            <Header />
            <UserDetails />
            <MoreOptions />
            <Footer />
        </>
    );
}
