import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <main className="main-content">
      <div className="banner m-contact">
        <h1 className="main-title">Contacto</h1>
      </div>
      <div className="content-section m-y">
        <h2 className="section-title">¿Necesitas saber más?</h2>
        <hr />
        <p className="m-y">
          Escribinos tus dudas, consultas o sugerencias y nosotros nos
          contactaremos contigo tan pronto podamos para brindarte la ayuda que
          necesitas.
        </p>
      </div>
      <div className="formulario">
        <h2>Formulario de Contacto</h2>
        <br />
        <form action="#">
          <fieldset>
            <legend>Nombre y Apellido:</legend>
            <input className="form-input" type="text" id="nombre" name="nombre" placeholder="Nombre y Apellido" required />
          </fieldset>
          <br />
          <fieldset>
            <legend>Correo Electrónico:</legend>
            <input className="form-input" type="email" id="email" name="email" required placeholder="Correo Electrónico" />
          </fieldset>
          <br />
          <fieldset>
            <legend>Consulta:</legend>
            <textarea className="form-input" id="consulta" name="consulta" required
              placeholder="Escriba su consulta..."></textarea>
          </fieldset>
          <br />
          <button className="btn secondary-button" type="submit">Enviar</button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
