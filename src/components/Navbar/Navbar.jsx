import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a className="item-link underline" href="pages/institutional.html">
            Institucional
          </a>
        </li>
        <li>
          <a className="item-link underline" href="pages/contact.html">
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
