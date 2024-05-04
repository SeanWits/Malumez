import "../../pages/home.css";
import logo from "../../assets/Malume'zLogoFullNoBackground.png";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
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
              onClick={() => navigate("/uploadImg")}
              className="fa fa-upload icon"
            />
            <i onClick={() => navigate("/login")} className="fa fa-bell icon" />
          </section>
        </header>
      </body>
    </>
  );
}
