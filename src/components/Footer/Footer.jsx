import React from "react";
import "./Footer.css";
import logo from "../../assets/img/logo-bn.webp";

const socialList = [
  { href: "https://boredbutton.com", class: "fa-brands fa-facebook" },
  { href: "https://boredbutton.com", class: "fa-brands fa-instagram" },
  { href: "https://boredbutton.com", class: "fa-brands fa-x-twitter" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <a href="index.html" className="logo">
        <img src={logo} alt="Logo" />
      </a>

      <ul className="iconos">
        {socialList.map((link) => (
          <li>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="tilt"
            >
              <i className={link.class}></i>
            </a>
          </li>
        ))}
      </ul>

      <hr className="long-line" />

      <div className="links-footer">
        <div className="columna-footer">
          <ul>
            <li>Centro de ayuda</li>
            <li>¿Cómo funciona....?</li>
            <li>Terminos y condiciones</li>
            <li>Información legal</li>
            <li>Aviso de privacidad</li>
          </ul>
        </div>
        <div className="columna-footer">
          <ul>
            <li>¿Cómo ser anfitrión?</li>
            <li>Recursos para anfitriones</li>
            <li>Foro de la comunidad</li>
            <li>Noticias</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
        <div className="columna-footer">
          <p>¿Quéres recibir ofertas exclusivas en tu email?</p>
          <form>
            <input
              className="input"
              type="mail"
              placeholder="Ingresá tu Email"
            />
            <button className="btn primary-button">¡Quiero Recibirlas!</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
