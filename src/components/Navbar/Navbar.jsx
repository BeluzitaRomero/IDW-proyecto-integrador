import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link className="item-link underline" to="/institucional" onClick={toggleMenu}>
              Institucional
            </Link>
          </li>
          <li className="nav-item">
            <Link className="item-link underline" to="/contacto" onClick={toggleMenu}>
              Contacto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="item-link underline" to="/administrar" onClick={toggleMenu}>
              Administrar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
