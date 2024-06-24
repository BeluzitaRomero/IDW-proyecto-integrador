import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import axios from "axios";
import AccommodationsTableFilter from "../../Filters/AccommodationsTableFilter/AccommodationsTableFilter";

const AccommodationTable = ({ accommodations, accommodationsType, deleteAccomodation }) => {
  const [filter, setFilter] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalMessage, setModalMessage] = useState();

  const handleDelete = (id, message) => {
    setModal(true);
    setModalId(id);
    setModalMessage(message);
  };

  const handleDeleteConfirm = async (id) => {
    const url = "http://localhost:3001/";
    const response = await axios.get(`${url}alojamientosServicios/getAlojamientoServicio/${id}`);

    if (response.data.length > 0) {
      const deleteRequests = response.data.map((service) =>
        axios.delete(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${service.idAlojamientoServicio}`)
      );
      await Promise.all(deleteRequests);
    }

    deleteAccomodation(id);
    setFilter([]);
    setModal(false);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = accommodations.filter((accommodation) => {
    return (
      (!filter.Titulo || accommodation.Titulo.toLowerCase().includes(filter.Titulo.toLowerCase())) &&
      (!filter.Descripcion || accommodation.Descripcion.toLowerCase().includes(filter.Descripcion)) &&
      (!filter.tipoAlojamiento || String(accommodation.idTipoAlojamiento) === filter.tipoAlojamiento) &&
      (!filter.Estado || accommodation.Estado === filter.Estado)
    );
  });

  return (
    <>
      <div className="flex-space">
        <h2 className="section-title">Alojamientos</h2>
        <Link to={`/agregar/alojamientos`} className="btn secondary-button">
          Agregar +
        </Link>
      </div>

      <AccommodationsTableFilter accommodationsType={accommodationsType} handleFilter={handleFilter} />
      <div className="accommodation-table">
        <table className="crud-table accommodation-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Tipo</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>PrecioPorDia</th>
              <th>Dormitorios</th>
              <th>Baños</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((accommodation) => (
                <tr key={accommodation.idAlojamiento}>
                  <td data-label="Id">{accommodation.idAlojamiento}</td>
                  <td data-label="Titulo">{accommodation.Titulo}</td>
                  <td data-label="Descripcion">{accommodation.Descripcion}</td>
                  <td data-label="Tipo">
                    {accommodationsType && accommodationsType.find((a) => a.idTipoAlojamiento === accommodation.idTipoAlojamiento).Descripcion}
                  </td>
                  <td data-label="Latitud">{accommodation.Latitud}</td>
                  <td data-label="Longitud">{accommodation.Longitud}</td>
                  <td data-label="PrecioPorDia">$ {accommodation.PrecioPorDia}</td>
                  <td data-label="Dormitorios">{accommodation.CantidadDormitorios}</td>
                  <td data-label="Baños">{accommodation.CantidadBanios}</td>
                  <td data-label="Estado">{accommodation.Estado}</td>
                  <td className="flex-center">
                    <Link to={`/alojamiento/${accommodation.idAlojamiento}`} className="icon-btn fa-solid fa-arrow-up-right-from-square"></Link>
                    <Link to={`/editar/alojamientos/${accommodation.idAlojamiento}`} className="icon-btn fa-solid fa-solid fa-pen-to-square"></Link>
                    <button
                      className="icon-btn fa-solid fa-trash"
                      onClick={() => {
                        handleDelete(accommodation.idAlojamiento, `¿Desea eliminar ${accommodation.Titulo}?`);
                      }}></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="center-text">
                  No se encontró
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal accept={() => handleDeleteConfirm(modalId)} cancel={() => setModal(false)}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default AccommodationTable;
