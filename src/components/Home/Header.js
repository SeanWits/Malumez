import logo from "../../assets/Malume'zLogoFullNoBackground.png";
import { useNavigate } from "react-router-dom";

export function Header({user}) {
    const navigate = useNavigate();
    const removeBodyClass = (className) =>
        document.body.classList.remove(className);
    removeBodyClass("bodyHidden");
    let route = "/login";
    console.log(user);
    if (user) {
        route = "/dashboard";
    }

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
                        className="fa fa-archive"
                        id="orderStatusIcon"
                        onClick={() => navigate("/OrderStatus")}
                    ></i>

                    <i
                        onClick={() => navigate("/seller")}
                        className="fa fa-question-circle icon"
                    />
                    <i
                        onClick={() => navigate("/checkOut")}
                        className="fa fa-shopping-basket icon"
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
