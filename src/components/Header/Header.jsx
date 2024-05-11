import React from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/img/logo.webp";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
