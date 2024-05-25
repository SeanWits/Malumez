import logo from "../../assets/Malume'zLogoFullNoBackground.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
export function Header({ user }) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    //check if user is logged in, and change route to dashboard if user is logged in
    let route = "/login";
    console.log(user);
    if (user) {
        route = "/dashboard";
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <header className="homeHeader">
                <img
                    onClick={() => navigate("/")}
                    src={logo}
                    alt="Malume'z Logo"
                    height="60"
                    width="auto"
                />
                <section>
                    <i
                        className="fa fa-archive icon"
                        id="orderStatusIcon"
                        onClick={() => navigate("/OrderStatus")}
                        style={{
                            pointerEvents:
                                !currentUser || loading ? "none" : "auto",
                            opacity: !currentUser || loading ? 0.5 : 1,
                        }}
                    ></i>
                    <i
                        onClick={() => navigate("/seller")}
                        className="fa fa-question-circle icon"
                    />
                    <i
                        onClick={() => navigate("/checkOut")}
                        className="fa fa-shopping-basket icon"
                        style={{
                            pointerEvents:
                                !currentUser || loading ? "none" : "auto",
                            opacity: !currentUser || loading ? 0.5 : 1,
                        }}
                    />
                    <i
                        onClick={() => navigate(route)}
                        className="fa fa-user-circle icon"
                    />
                </section>
            </header>
        </>
    );
}
