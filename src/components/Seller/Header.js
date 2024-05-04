import { useNavigate } from "react-router-dom";
import logo from "../../assets/Malume'zLogoFullNoBackground.png";
import "../../pages/home.css";

export function Header() {
  const navigate = useNavigate();

  <header className="homeHeader">
    <img
      onClick={() => navigate("/")}
      src={logo}
      alt="Malume'z Logo"
      height="60"
      width="auto"
    />
    <section>
      <i className="fa fa-upload icon" />
      <i onClick={() => navigate("/checkOut")} className="fa fa-bell icon" />
    </section>
  </header>;
}
