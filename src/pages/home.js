// import logo from "../assets/Malume'zLogoFullNoBackground.png";
import "./home.css";
import { Header } from "../components/Home/Header";
import { SearchBar } from "../components/Home/Search";
import { MoreOptions } from "../components/Home/More_Options";
import { Footer } from "../components/Home/Footer";
import { Categories } from "../components/Home/Categories";
import { AdsBar } from "../components/Home/AdsBar";
import { FeaturedProducts } from "../components/Home/FeaturedProduct";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

function Home() {
    useEffect(() => {
        document.body.classList.remove("bodyHidden");
    }, []);
    const user = useContext(UserContext);
    localStorage.setItem("searchInput", "nothing");
    return (
        <>
            <Header user={user} />
            <SearchBar />
            <AdsBar />
            <FeaturedProducts />
            <Categories />
            <MoreOptions />
            <Footer />
        </>
    );
}

export default Home;
