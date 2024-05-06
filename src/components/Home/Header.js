import logo from "../../assets/Malume'zLogoFullNoBackground.png";
import { useNavigate } from "react-router-dom";

export function Header() {
  // const loginPage = () => {
  const navigate = useNavigate();
  const removeBodyClass = (className) =>
    document.body.classList.remove(className);
  removeBodyClass("bodyHidden");

  // }
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <header className="homeHeader">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Malume'z Logo"
          height="60"
          width="auto"
        />
        <section>
          <i className="fa fa-question-circle icon" />
          <i
            onClick={() => navigate("/checkOut")}
            className="fa fa-shopping-basket icon"
          />
          <i
            onClick={() => navigate("/login")}
            className="fa fa-user-circle icon"
          />
        </section>
      </header>
    </>
  );
}
