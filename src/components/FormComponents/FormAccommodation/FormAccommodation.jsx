import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../../utils/api";
import axios from "axios";
import Input from "../../Input/Input";

const FormAccommodation = ({ id }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  //estados para tipos y alojamientos
  const [types, setTypes] = useState([]);

  // Estado para los servicios seleccionados
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);

  //Estado para los datos del form de alojamiento
  const [dataForm, setDataForm] = useState({
    Titulo: "",
    Descripcion: "",
    Latitud: "",
    Longitud: "",
    PrecioPorDia: "",
    CantidadDormitorios: "",
    CantidadBanios: "",
    Estado: "Disponible",
    idTipoAlojamiento: "",
  });

  const fetchUrl = "http://localhost:3001";

  // Handle para los input de aloj
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Handle para checkboxes: chequea si hay tildados o no y actualiza el estado
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedServices((prev) => {
      if (checked) {
        if (!prev.includes(parseInt(value))) {
          return [...prev, parseInt(value)];
        }
      } else {
        return prev.filter((idServicio) => idServicio !== parseInt(value));
      }
      return prev;
    });
  };

  //Validar que todos los campos obligatorios estén completos
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
    setSelectedServices([]);
  };

  useEffect(() => {
    if (id) {
      // traigo alojamiento
      getData(`${fetchUrl}/alojamiento/getAlojamiento/${id}`)
        .then((res) => setDataForm(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
    //traigo tipos
    getData(`${fetchUrl}/tiposAlojamiento/getTiposAlojamiento`)
      .then((res) => setTypes(res))
      .catch((err) => console.error(`Error: ${err}`));

    //traigo servicios
    getData(`${fetchUrl}/servicio/getAllServicios`)
      .then((res) => setServices(res))
      .catch((err) => console.error(`Error: ${err}`));

    //traigo serivicios asociados a un alojamiento
    getData(`${fetchUrl}/alojamientosServicios/getAlojamientoServicio/${id}`)
      .then((response) => {
        setSelectedServices(response.map((service) => service.idServicio));
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // CASO IF: cuando hay un id de alojamiento existente, hace put de aloj
      // y busca servicios asociados para borrar los que ya no tiene y agregar nuevos
      try {
        // Actualizar alojamiento
        await axios.put(`${fetchUrl}/alojamiento/putAlojamiento/${id}`, dataForm);

        // Obtener servicios asociados inicialmente
        const initialSelectedServices = await axios.get(`${fetchUrl}/alojamientosServicios/getAlojamientoServicio/${id}`).then((res) => res.data);

        // Guardar los idAlojamientoServicios
        const initialServiceIds = initialSelectedServices.map((service) => service.idAlojamientoServicio);

        // Encontrar los servicios que se han desmarcado (eliminar)
        const servicesToDelete = initialSelectedServices.filter((service) => !selectedServices.includes(service.idServicio));

        // Encontrar los nuevos servicios que se han marcado (agregar)
        const servicesToAdd = selectedServices.filter((serviceId) => !initialServiceIds.includes(serviceId));

        // Eliminar las asociaciones de servicios desmarcados (por idAlojamientoServicio)
        const deleteRequests = servicesToDelete.map((service) =>
          axios.delete(`${fetchUrl}/alojamientosServicios/deleteAlojamientoServicio/${service.idAlojamientoServicio}`)
        );

        // Crear nuevas asociaciones de servicios marcados (post)
        const addRequests = servicesToAdd.map((idServicio) => {
          const servicioSeleccionado = {
            idAlojamiento: parseInt(id),
            idServicio: parseInt(idServicio),
          };
          return axios.post(`${fetchUrl}/alojamientosServicios/createAlojamientoServicio`, servicioSeleccionado);
        });

        // Esperar a que todas las solicitudes se completen porque el backend
        // no esta preparado para recibir multipls inserciones concurrentes
        await Promise.all([...deleteRequests, ...addRequests]);

        setModalMessage(`Alojamiento y servicios actualizados con éxito`);
        setModal(true);
        clearForm();
      } catch (error) {
        setModalMessage(`Ocurrió un error al actualizar el alojamiento y servicios`);
        setModal(true);
        console.error("Hubo un error al realizar la solicitud PUT:", error);
      }
    } else {
      //CASO ELSE hace el post de un Alojamiento NUEVO

      // Validar formulario antes de enviar solo si no hay un ID
      if (!validateForm()) {
        setModalError(true);
        setModalMessage("Por favor complete todos los campos correctamente.");
        return;
      }

      try {
        const res = await axios.post(`${fetchUrl}/alojamiento/createAlojamiento`, dataForm);

        // El ID del alojamiento se devuelve en la respuesta
        const alojamientoId = res.data.id;

        // Crear servicios asociados (iterando, para crear la estructura de cada uno
        // y su post individual)
        const requests = selectedServices.map((idServicio) => {
          const servicioSeleccionado = {
            idAlojamiento: parseInt(alojamientoId),
            idServicio: parseInt(idServicio),
          };

          return axios.post(`${fetchUrl}/alojamientosServicios/createAlojamientoServicio`, servicioSeleccionado);
        });

        await Promise.all(requests);

        setModalMessage(`Alojamiento y servicios creados con éxito`);
        setModal(true);
        clearForm();
      } catch (err) {
        setModalMessage(`Ocurrió un error al crear el alojamiento y servicios`);
        setModal(true);
        console.error(`Error: ${err}`);
      }
    }
  };

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">{id ? "Actualizar" : "Agregar"} Alojamiento</h2>
      <form onSubmit={handleSubmit} className="service-checkboxes">
        <Input inputLabel="Titulo" inputName="Titulo" inputType="text" inputValue={dataForm.Titulo} inputChange={handleChange} />
        <Input inputLabel="Descripcion" inputName="Descripcion" inputType="text" inputValue={dataForm.Descripcion} inputChange={handleChange} />
        <div className="form-group">
          <label htmlFor="idTipoAlojamiento">Tipo de alojamiento</label>
          <select name="idTipoAlojamiento" value={dataForm.idTipoAlojamiento || ""} onChange={handleChange}>
            <option value="" disabled>
              Seleccione un tipo
            </option>
            {types.map((type) => (
              <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                {type.Descripcion}
              </option>
            ))}
          </select>
        </div>
        <Input inputLabel="Latitud" inputName="Latitud" inputType="number" inputValue={dataForm.Latitud} inputChange={handleChange} />
        <Input inputLabel="Longitud" inputName="Longitud" inputType="number" inputValue={dataForm.Longitud} inputChange={handleChange} />
        <Input
          inputLabel="Precio por día"
          inputName="PrecioPorDia"
          inputType="number"
          inputValue={dataForm.PrecioPorDia}
          inputChange={handleChange}
        />
        <Input
          inputLabel="Cantidad de dormitorios"
          inputName="CantidadDormitorios"
          inputType="number"
          inputValue={dataForm.CantidadDormitorios}
          inputChange={handleChange}
        />
        <Input
          inputLabel="Cantidad de baños"
          inputName="CantidadBanios"
          inputType="number"
          inputValue={dataForm.CantidadBanios}
          inputChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="Estado">Estado</label>
          <select name="Estado" value={dataForm.Estado} onChange={handleChange} required>
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>
        <div className="form-group">
          <h2 className="title-secondary">Servicios</h2>
          <div className="checkbox-container">
            {services.length &&
              services.map((service) => (
                <div key={service.idServicio} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`servicio-${service.idServicio}`}
                    value={service.idServicio}
                    checked={selectedServices.includes(service.idServicio)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`servicio-${service.idServicio}`} className="service-label">
                    {service.Nombre}
                  </label>
                </div>
              ))}
          </div>
        </div>

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

export default FormAccommodation;
