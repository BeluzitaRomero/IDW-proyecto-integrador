import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../FormComponent.css";
import axios from "axios";
import Modal from "../../Modal/Modal";

const FormAccommodationType = ({ id }) => {
  const initialForm = {
    Descripcion: "",
  };

  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  const fetchUrl = "http://localhost:3001/tiposAlojamiento/";

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${fetchUrl}getTipoAlojamiento/${id}`);
          setForm(response.data);
        } catch (error) {
          console.error("No se encontro un alojamiento con ese id:", error);
        }
      };
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${fetchUrl}putTipoAlojamiento/${id}`, form);
      } else {
        await axios.post(`${fetchUrl}createTipoAlojamiento`, form);
      }
      setModalMessage(`Tipo de alojamiento ${id ? "actualizado" : "creado"} con éxito`);
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(`Ocurrió un error al ${id ? "actualizar" : "crear"} el tipo de alojamiento`);
    }
    setModal(true);
    setForm(initialForm);
  };

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">{id ? "Actualizar" : "Agregar"} Tipo de Alojamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Descripcion">Descripcion</label>
          <input name="Descripcion" type="text" defaultValue={form.Descripcion} onChange={handleChange} />
        </div>
        <Link to="/administrar" className="btn cancel-button">
          Volver
        </Link>
        <button className="btn accent-button" type="submit">
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
      {modal && (
        <Modal>
          {modalMessage}
          <Link to="/administrar" className="btn secondary-button">
            Volver
          </Link>
        </Modal>
      )}
    </main>
  );
};

export default FormAccommodationType;
