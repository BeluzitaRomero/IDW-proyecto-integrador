import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { getData, deleteData } from "../../../utils/api";

const AccomodationTable = ({ accommodations }) => {
  const [accommodationsType, setAccommodationsType] = useState();
  const [accommodationType, setAccommodationType] = useState();
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
      (!filter.Selec || String(accommodation.idTipoAlojamiento) === filter.Selec)
    );
  });

  useEffect(() => {
    getData(`http://localhost:3001/tiposAlojamiento/getTiposAlojamiento/`)
      .then((res) => setAccommodationsType(res))
      .catch((err) => console.error(`Error: ${err}`));
  }, [accommodations]);
  console.log(accommodations[0].tipoAlojamiento);
  return (
    <>
      <div className="flex-space">
        <h2 className="section-title">Alojamientos</h2>
        <Link to={`/agregar/alojamientos`} className="btn secondary-button">
          Agregar +
        </Link>
      </div>
      <div className="flex-space">
        a
        <input type="text" placeholder="Titulo" name="Titulo" onChange={handleFilter} />
        <input type="text" placeholder="Descripcion" name="Descripcion" onChange={handleFilter} />
        <select name="Selec" id="" onChange={handleFilter}>
          <option value="">Tipo</option>
          {accommodationsType &&
            accommodationsType.map((type) => (
              <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                {type.Descripcion}
              </option>
            ))}
        </select>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>PrecioPorDia</th>
            <th>Dormitorios</th>
            <th>Baños</th>
            <th>Estado</th>
            <th>Tipo alojamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            filteredData.map((accommodation) => (
              <tr key={accommodation.idAlojamiento}>
                <td>{accommodation.idAlojamiento}</td>
                <td>{accommodation.Titulo}</td>
                <td>{accommodation.Descripcion}</td>
                <td>{accommodation.Latitud}</td>
                <td>{accommodation.Longitud}</td>
                <td>{accommodation.PrecioPorDia}</td>
                <td>{accommodation.CantidadDormitorios}</td>
                <td>{accommodation.CantidadBanios}</td>
                <td>{accommodation.Estado}</td>
                <td>{accommodationsType.find((a) => a.idTipoAlojamiento === accommodation.idTipoAlojamiento).Descripcion}</td>
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

export default AccomodationTable;
