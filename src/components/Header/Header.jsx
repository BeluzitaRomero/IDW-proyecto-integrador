import React from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/img/logo.webp";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <a href="index.html">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
