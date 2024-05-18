import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <button aria-label="upload" onClick={() => navigate('/uploadImg')}>
          <i className="fa fa-upload icon" />
        </button>
        <button aria-label="bell" onClick={() => navigate('/login')}>
          <i className="fa fa-bell icon" />
        </button>
      </section>
    </header>
  );
};

export default Header;
