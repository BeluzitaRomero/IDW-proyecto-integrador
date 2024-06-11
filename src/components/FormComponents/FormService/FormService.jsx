import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../FormComponent.css";
import axios from "axios";
import Modal from "../../Modal/Modal";
import { getData } from "../../../utils/api";

const FormService = ({ id }) => {
  const initialForm = {
    Nombre: "",
  };

  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const apiUrl = "http://localhost:3001/servicio/";

  const compareData = (resData, formData) => {
    return resData.some((data) => {
      return formData.Nombre.toLowerCase() === data.Nombre.toLowerCase();
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await getData(`${apiUrl}getAllServicios/`);
      if (compareData(responseData, form)) {
        setModalMessage(`Servicio ya existente`);
      } else {
        if (id) {
          await axios.put(`${apiUrl}updateServicio/${id}`, form);
        } else {
          await axios.post(`${apiUrl}createServicio`, form);
        }
        setModalMessage(`Tipo de alojamiento ${id ? "actualizado" : "creado"} con éxito`);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(`Ocurrió un error al ${id ? "actualizar" : "crear"} el tipo de alojamiento`);
    }
    setModal(true);
  };

  useEffect(() => {
    if (id) {
      getData(`${apiUrl}getServicio/${id}`)
        .then((res) => setForm(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
  }, []);

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">{id ? "Actualizar" : "Agregar"} Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Nombre">Nombre</label>
          <input name="Nombre" type="text" defaultValue={form.Nombre} onChange={handleChange} />
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

export default FormService;
