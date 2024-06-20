import { useState, useEffect } from "react";
import "./Contact.css";
import Banner from "../../components/Banner/Banner";
import bgImg from "../../assets/img/banner-contact.jpg";

const Contact = () => {
  const [mensajesArray, setMensajesArray] = useState([]);

  const [mensaje, setMensaje] = useState({
    nombreYApellido: "",
    email: "",
    mensaje: "",
  });

  useEffect(() => {
    cargar();
  }, []);

  const cargar = () => {
    let lsMensajes = JSON.parse(localStorage.getItem("mensajes"));
    if (typeof lsMensajes === "undefined") {
      lsMensajes = [];
    }
    setMensajesArray(lsMensajes);
  };

  const enviarForm = () => {
    alert(JSON.stringify(mensaje));
    let lsMensajes = [];
    if (localStorage.getItem("mensajes")) {
      lsMensajes = JSON.parse(localStorage.getItem("mensajes"));
    }
    lsMensajes.push(mensaje);
    localStorage.setItem("mensajes", JSON.stringify(lsMensajes));
    setMensajesArray(lsMensajes);
  };

  return (
    <main className="main-content">
      <Banner imagen={bgImg} titulo="Contacto" />
      <div className="content-section m-y">
        <h2 className="section-title">¿Necesitas saber más?</h2>
        <hr />
        <p className="m-y">
          Escribinos tus dudas, consultas o sugerencias y nosotros nos contactaremos contigo tan pronto podamos para brindarte la ayuda que necesitas.
        </p>
      </div>
      <div className="contact-form">
        <h2 className="section-title">Formulario de Contacto</h2>
        <form action="#">
          <fieldset>
            <legend>Nombre y Apellido:</legend>
            <input
              className="form-input"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre y Apellido"
              value={mensaje.nombreYApellido}
              required
              onChange={(evt) => setMensaje({ ...mensaje, nombreYApellido: evt.target.value })}
            />
          </fieldset>

          <fieldset>
            <legend>Correo Electrónico:</legend>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Correo Electrónico"
              value={mensaje.email}
              onChange={(evt) => setMensaje({ ...mensaje, email: evt.target.value })}
            />
          </fieldset>

          <fieldset>
            <legend>Consulta:</legend>
            <textarea
              className="form-input"
              id="consulta"
              name="consulta"
              required
              placeholder="Escriba su consulta..."
              value={mensaje.mensaje}
              onChange={(evt) => setMensaje({ ...mensaje, mensaje: evt.target.value })}></textarea>
          </fieldset>

          <button className="btn secondary-button" type="submit" onClick={() => enviarForm()}>
            Enviar
          </button>
        </form>
      </div>
      {!mensajesArray ? (
        ""
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Apellido y Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {mensajesArray.map((m, index) => (
              <tr key={index}>
                <td data-label="Apellido y Nombre">{m.nombreYApellido}</td>
                <td data-label="Email">{m.email}</td>
                <td data-label="Mensaje">{m.mensaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Contact;
