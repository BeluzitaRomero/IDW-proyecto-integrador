import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TableComponent.css";
import Modal from "../Modal/Modal";
import { getData, deleteData } from "../../utils/api";

const TableComponent = ({ titles, tableGet, tableDelete, tableName, tableParam }) => {
  const [data, setData] = useState([]);

  // Estados de los modales
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalMessage, setModalMessage] = useState();

  const handleDelete = (id, message) => {
    setModal(true);
    setModalId(id);
    setModalMessage(message);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteData(`${tableDelete + id}`);
      const updateData = await getData(tableGet);
      setData(updateData);
      setModal(false);
    } catch (error) {
      setModal(false);
      setModalMessage("Error al eliminar. Por favor verifique que no haya alojamientos asociados");
      setModalError(true);
    }
  };

  useEffect(() => {
    getData(tableGet)
      .then((res) => setData(res))
      .catch((err) => console.error(`Error: ${err}`));
  }, [tableGet]);

  return (
    <>
      <div className="flex-space">
        <h2 className="section-title">{tableName}</h2>
        <Link to={`/agregar/${tableParam}`} className="btn secondary-button">
          Agregar +
        </Link>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((singleData, index) => (
            <tr key={index}>
              {Object.values(singleData).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              <td className="flex-center">
                <Link to={`/editar/${tableParam}/${Object.values(singleData)[0]}`} className="icon-btn fa-solid fa-solid fa-pen-to-square"></Link>
                <button
                  className="icon-btn fa-solid fa-trash"
                  onClick={() => {
                    handleDelete(Object.values(singleData)[0], `¿Desea eliminar ${Object.values(singleData)[1]}?`);
                  }}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <Modal accept={() => handleDeleteConfirm(modalId)} cancel={() => setModal(false)}>
          <p>{modalMessage}</p>
        </Modal>
      )}
      {modalError && (
        <Modal accept={() => setModalError(false)}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </>
  );
};

export default TableComponent;
