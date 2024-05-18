import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import OrderTracking from "../components/OrderStatus/OrderTracking";
export default function OrderStatus() {
    return (
        <>
            <Header />
            <OrderTracking />
            <MoreOptions />
            <Footer />
        </>
    );
}
