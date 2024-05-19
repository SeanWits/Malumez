import React, { useContext } from 'react';
import Header from "../components/Seller/Header";
import SellerProducts from "../components/Seller/SellerProducts";
import { Footer } from "../components/Home/Footer";
import { ShopDetails } from "../components/Seller/ShopDetails";
import "./Seller.css";
import { UserContext } from '../App';

function Seller() {
    const user = useContext(UserContext);

    return (
        <>
            <Header />
            <section className="details_stock">
                <ShopDetails user={user} />
                <SellerProducts user={user}/>
            </section>
            <Footer />
        </>
    );
}

export default Seller;
