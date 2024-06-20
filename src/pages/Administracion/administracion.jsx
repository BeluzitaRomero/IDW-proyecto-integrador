import React, { useState } from "react";
import Button from "../../components/Button/Button";  // Ruta de importación correcta
import "./administracion.css";  // Ruta de importación correcta

const Admin = () => {
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API.
    console.log("Descripción enviada:", description);
  };

  return (
    <div className="admin-container">
      <h2>FORMULARIO DE ADMINISTRACIÓN</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Escribe una descripción"
          />
        </div>
        <Button type="submit" className="secondary-button btn" value={"Enviar"} Button/> 
      </form>
    </div>
  );
};

export default Admin;
