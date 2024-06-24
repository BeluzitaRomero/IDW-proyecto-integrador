import React from "react";
import "./MainHome.css";

const MainHome = () => {
  return (
    <main className="main-content m-home p-y">
      <h2 className="alter-title fade-in-top">Disfrutá de esta nueva experiencia</h2>
      <h1 className="main-title fade-in-bck">Tu escapada ideal comienza acá</h1>
      <p className="fade-in-bottom">
        Te ofrecemos una amplia gama de opciones para que encuentres el lugar perfecto para tu próxima aventura. ¡Explora nuestras opciones y reserva
        hoy mismo para asegurarte una experiencia inolvidable!
      </p>
      <a href="#explorar" className="btn primary-button fade-in-bottom">
        Explorar
      </a>
    </main>
  );
};

export default MainHome;
