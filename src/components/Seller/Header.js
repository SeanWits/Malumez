import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Malume'zLogoFullNoBackground.png";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="homeHeader">
            <img
                onClick={() => navigate("/")}
                src={logo}
                alt="Malume'z Logo"
                height="60"
            />
            <section>
                <i
                    className="fa fa-upload icon"
                    onClick={() => navigate("/uploadImg")}
                />
                <i
                    className="fa fa-bell icon"
                    onClick={() => navigate("/notifications")}
                />
            </section>
        </header>
    );
};

export default Header;
