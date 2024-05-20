import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Admin from "./pages/admin";
import Products from "./pages/products";
import Checkout from "./pages/Checkout";
import StoreImageTextFirebase from "./pages/uploadImg";
import Seller from "./pages/Seller";
import SellerProducts from "./components/Seller/SellerProducts";
import Notifications from "./components/Seller/Notifications";
import OrderStatus from "./pages/OrderStatus";
import { auth } from "./firebase";
import Dashboard from "./pages/Dashboard";
import SellerForm from "./pages/sellerForm";


export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={user}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/checkOut" element={<Checkout />} />
                    <Route
                        path="/uploadImg"
                        element={<StoreImageTextFirebase />}
                    />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/sellerP" element={<SellerProducts />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/orderStatus" element={<OrderStatus />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/SellerForm" element={<SellerForm />} />
                    
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
