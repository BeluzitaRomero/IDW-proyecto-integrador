import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="item-link underline" to="/institucional">
            Institucional
          </Link>
        </li>
        <li>
          <Link className="item-link underline" to="/contacto">
            Contacto
          </Link>
        </li>
        <li>
          <Link className="item-link underline" to="/administracion">
            Administracion
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
