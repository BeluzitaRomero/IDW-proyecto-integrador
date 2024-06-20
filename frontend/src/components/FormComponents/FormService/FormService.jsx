import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../FormComponent.css";
import axios from "axios";
import Modal from "../../Modal/Modal";
import { getData } from "../../../utils/api";
import Input from "../../Input/Input";

const FormService = ({ id }) => {
  const initialForm = {
    Nombre: "",
  };

  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const [modalError, setModalError] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  const apiUrl = "http://localhost:3001/servicio/";

  const compareData = (resData, formData) => {
    return resData.some((data) => {
      return formData.Nombre.toLowerCase() === data.Nombre.toLowerCase();
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
      setModalError(true);
      return;
    }
    try {
      const responseData = await getData(`${apiUrl}getAllServicios/`);
      if (compareData(responseData, form)) {
        setModalMessage(`Servicio ya existente`);
        setModalError(true);
      } else {
        if (id) {
          await axios.put(`${apiUrl}updateServicio/${id}`, form);
        } else {
          await axios.post(`${apiUrl}createServicio`, form);
        }
        setModalMessage(`Servicio ${id ? "actualizado" : "creado"} con éxito`);
        setModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(`Ocurrió un error al ${id ? "actualizar" : "crear"} el servicio`);
      setModalError(true);
    }
  };

  useEffect(() => {
    if (id) {
      getData(`${apiUrl}getServicio/${id}`)
        .then((res) => setForm(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
  }, [id]);

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">{id ? "Actualizar" : "Agregar"} Servicio</h2>

      <form onSubmit={handleSubmit}>
        <Input inputLabel="Nombre" inputName="Nombre" inputType="text" inputValue={form.Nombre} inputChange={handleChange} />

        <Link to="/administrar" className="btn cancel-button">
          Volver
        </Link>
        <button className="btn accent-button" type="submit">
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {modal && (
        <Modal accept={() => navigate("/administrar")}>
          <p>{modalMessage}</p>
        </Modal>
      )}
      {modalError && (
        <Modal accept={() => setModalError(false)} cancel={() => navigate("/administrar")}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </main>
  );
};

export default FormService;
