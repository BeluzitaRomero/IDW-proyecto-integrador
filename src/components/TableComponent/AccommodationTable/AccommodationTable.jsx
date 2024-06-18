import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { getData, deleteData } from "../../../utils/api";

const AccommodationTable = ({ accommodations, accommodationsType }) => {
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
    await deleteData(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`);
    const updateData = await getData("http://localhost:3001/alojamiento/getAlojamientos");
    setFilter(updateData);
    setModal(false);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = accommodations.filter((accommodation) => {
    return (
      (!filter.Titulo || accommodation.Titulo.includes(filter.Titulo)) &&
      (!filter.Descripcion || accommodation.Descripcion.includes(filter.Descripcion)) &&
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
      <div className="flex-space crud-inputs">
        <input type="text" placeholder="Titulo" name="Titulo" onChange={handleFilter} className="crud-input" />
        <input type="text" placeholder="Descripcion" name="Descripcion" onChange={handleFilter} className="crud-input" />
        <select name="tipoAlojamiento" id="" onChange={handleFilter} className="crud-input">
          <option value="">Tipo</option>
          {accommodationsType &&
            accommodationsType.map((type) => (
              <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                {type.Descripcion}
              </option>
            ))}
        </select>
        <select name="Estado" id="" onChange={handleFilter} className="crud-input">
          <option value="">Estado</option>
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
      </div>
      <table className="crud-table">
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
          {filteredData ? (
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
            <tr className="">
              <td>No se encontro</td>
            </tr>
          )}
          {modal && (
            <Modal accept={() => handleDeleteConfirm(modalId)} cancel={() => setModal(false)}>
              <p>{modalMessage}</p>
            </Modal>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AccommodationTable;
