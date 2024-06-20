import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav>
      <button className={toggle ? "hola" : "chau"} onClick={() => setToggle(!toggle)}>
        a
      </button>
      <ul className={toggle ? "hola" : "chau"}>
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
          <Link className="item-link underline" to="/administrar">
            Administrar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
