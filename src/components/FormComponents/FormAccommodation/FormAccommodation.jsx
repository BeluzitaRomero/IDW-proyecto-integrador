import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const FormAccommodation = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const [dataForm, setDataForm] = useState({
    Titulo: "",
    Descripcion: "",
    idTipoAlojamiento: null,
    Latitud: null,
    Longitud: null,
    PrecioPorDia: null,
    CantidadDormitorios: null,
    CantidadBanios: null,
    Estado: "Disponible",
  });

  const fetchUrl = "http://localhost:3001";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Validar que todos los campos obligatorios estén completos
  const validateForm = () => {
    return Object.values(dataForm).every((value) => value !== "");
  };

  // Limpiar el formulario después de enviar
  const clearForm = () => {
    setDataForm({
      Titulo: "",
      Descripcion: "",
      idTipoAlojamiento: "",
      Latitud: "",
      Longitud: "",
      PrecioPorDia: "",
      CantidadDormitorios: "",
      CantidadBanios: "",
      Estado: "Disponible",
    });
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${fetchUrl}/alojamiento/getAlojamiento/${id}`);
          setDataForm(response.data);
        } catch (error) {
          console.error("No se encontro un alojamiento con ese id:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`${fetchUrl}/alojamiento/putAlojamiento/${id}`, dataForm)
        .then((response) => {
          // Manejar la respuesta exitosa aquí si es necesario
          setModalMessage(`Alojamiento ${id ? "actualizado" : "creado"} con éxito`);
          setModal(true);
          clearForm();
          console.log("La solicitud PUT fue exitosa:", response);
        })
        .catch((error) => {
          // Manejar cualquier error que ocurra durante la solicitud
          setModalMessage(`Ocurrió un error al ${id ? "actualizar" : "crear"} el alojamiento`);
          setModal(true);
          console.error("Hubo un error al realizar la solicitud PUT:", error);
        });
    } else {
      // Validar formulario antes de enviar
      if (!validateForm()) {
        setModal(true);
        setModalMessage("Por favor complete todos los campos correctamente.");
        return;
      }
      fetch(`${fetchUrl}/alojamiento/createAlojamiento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al crear el alojamiento");
          }
          return res.json();
        })
        .then((data) => {
          setModalMessage(`Alojamiento ${id ? "actualizado" : "creado"} con éxito`);
          clearForm();
        })
        .catch((error) => {
          setModalMessage(`Ocurrió un error al ${id ? "actualizar" : "crear"} el alojamiento`);
        });
      setModal(true);
    }
  };

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">{id ? "Actualizar" : "Agregar"} Alojamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Titulo">Titulo</label>
          <input name="Titulo" type="text" defaultValue={dataForm.Titulo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Descripcion">Descripción</label>
          <input name="Descripcion" type="text" defaultValue={dataForm.Descripcion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="TipoAlojamiento">Tipo de alojamiento</label>
          <input name="TipoAlojamiento" type="number" defaultValue={dataForm.TipoAlojamiento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Latitud">Latitud</label>
          <input name="Latitud" type="number" defaultValue={dataForm.Latitud} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Longitud">Longitud</label>
          <input name="Longitud" type="number" defaultValue={dataForm.Longitud} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="PrecioPorDia">Precio por día</label>
          <input name="PrecioPorDia" type="number" defaultValue={dataForm.PrecioPorDia} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="CantidadDormitorios">Cantidad de dormitorios</label>
          <input name="CantidadDormitorios" type="number" defaultValue={dataForm.CantidadDormitorios} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="CantidadBanios">Cantidad de baños</label>
          <input name="CantidadBanios" type="number" defaultValue={dataForm.CantidadBanios} onChange={handleChange} min={"0"} />
        </div>
        <div className="form-group">
          <label htmlFor="Estado">Estado:</label>
          <select name="Estado" value={dataForm.Estado} onChange={handleChange} required>
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
          </select>
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

export default FormAccommodation;
