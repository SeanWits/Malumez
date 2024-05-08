// import "./Seller.css";
import { Header } from "../components/Seller/Header";
// import { Stock } from "../components/Seller/Stock";
import SellerProducts from "../components/Seller/SellerProducts";
import { Footer } from "../components/Home/Footer";
import { ShopDetails } from "../components/Seller/ShopDetails";
import "./Seller.css"

function Seller() {
  return (
    <>
      <Header />
      <section className="details_stock">
        <ShopDetails />
        <SellerProducts />
      </section>
      <Footer />
    </>
  );
}

export default Seller;
