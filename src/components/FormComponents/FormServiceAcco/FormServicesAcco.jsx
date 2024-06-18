import React, { useState, useEffect } from "react";
import axios from "axios";
import { getData } from "../../../utils/api";
import { useParams, Link } from "react-router-dom";
import Modal from "../../Modal/Modal";

const FormServicesAcco = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { id } = useParams();
  const fetchUrl = "http://localhost:3001";

  useEffect(() => {
    if (id) {
      axios
        .get(`${fetchUrl}/alojamientosServicios/getAlojamientoServicio/${id}`)
        .then((response) => {
          setSelectedServices(
            response.data.map((service) => service.idServicio)
          );
        })
        .catch((error) => console.error("Error fetching services:", error));

      getData(`${fetchUrl}/servicio/getAllServicios`)
        .then((res) => setServices(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
  }, [id]);

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

  const saveSelectedServices = async (event) => {
    event.preventDefault();

    try {
      // Eliminar todos los servicios existentes para el alojamiento
      await axios.delete(
        `${fetchUrl}/alojamientosServicios/deleteAlojamientoServicio/${id}`
      );

      // Agregar todos los servicios seleccionados nuevamente
      const requests = selectedServices.map((idServicio) => {
        const servicioSeleccionado = {
          idAlojamiento: parseInt(id),
          idServicio: parseInt(idServicio),
        };
        return axios.post(
          `${fetchUrl}/alojamientosServicios/createAlojamientoServicio`,
          servicioSeleccionado
        );
      });

      await Promise.all(requests);

      setModalMessage("Servicios guardados exitosamente.");
      setModal(true);
    } catch (error) {
      console.error("Error creando servicios:", error);
      setModalMessage("Hubo un error al crear los servicios.");
      setModal(true);
    }
  };

  return (
    <section>
      <form className="service-checkboxes" onSubmit={saveSelectedServices}>
        <h2>Selecciona los servicios para este alojamiento:</h2>
        <div className="checkbox-container">
          {services.length ? (
            services.map((service) => (
              <div key={service.idServicio} className="checkbox-group">
                <label
                  htmlFor={`servicio-${service.idServicio}`}
                  className="service-label"
                >
                  {service.Nombre}
                </label>
                <input
                  type="checkbox"
                  id={`servicio-${service.idServicio}`}
                  value={service.idServicio}
                  checked={selectedServices.includes(service.idServicio)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          ) : (
            <p>Cargando servicios...</p>
          )}
        </div>
        <Link to="/administrar" className="btn cancel-button">
          Volver
        </Link>
        <button className="btn accent-button" type="submit">
          Guardar Servicios
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
    </section>
  );
};

export default FormServicesAcco;
