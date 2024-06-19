import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../FormComponent.css";
import axios from "axios";
import Modal from "../../Modal/Modal";
import { getData } from "../../../utils/api";

const FormAccommodationType = ({ id }) => {
  const initialForm = {
    Descripcion: "",
  };

  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const apiUrl = "http://localhost:3001/tiposAlojamiento/";

  const compareData = (resData, formData) => {
    return resData.some((data) => {
      return formData.Descripcion.toLowerCase() === data.Descripcion.toLowerCase();
    });
  };

  const validateForm = () => {
    return Object.values(form).every((value) => value !== "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setModalMessage("Por favor completa todos los campos");
      setModal(true);
      return;
    }
    try {
      const responseData = await getData(`${apiUrl}getTiposAlojamiento/`);
      if (compareData(responseData, form)) {
        setModalMessage(`Tipo de alojamiento ya existente`);
      } else {
        if (id) {
          await axios.put(`${apiUrl}putTipoAlojamiento/${id}`, form);
        } else {
          await axios.post(`${apiUrl}createTipoAlojamiento`, form);
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
      getData(`${apiUrl}getTipoAlojamiento/${id}`)
        .then((res) => setForm(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
  }, []);

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
