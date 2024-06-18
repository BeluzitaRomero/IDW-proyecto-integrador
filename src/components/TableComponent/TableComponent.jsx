import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TableComponent.css";
import Modal from "../Modal/Modal";
import { getData, deleteData } from "../../utils/api";

const TableComponent = ({ titles, tableGet, tableDelete, tableName, tableParam }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalMessage, setModalMessage] = useState();

  const handleDelete = (id, message) => {
    setModal(true);
    setModalId(id);
    setModalMessage(message);
  };

  const handleDeleteConfirm = async (id) => {
    await deleteData(`${tableDelete + id}`);
    const updateData = await getData(tableGet);
    setData(updateData);
    setModal(false);
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
                <td data-label={titles[i]} key={i}>
                  {value}
                </td>
              ))}
              <td className="flex-center">
                {tableName === "Alojamientos" && (
                  <Link to={`/alojamiento/${Object.values(singleData)[0]}`} className="icon-btn fa-solid fa-arrow-up-right-from-square"></Link>
                )}
                <Link to={`/editar/${tableParam}/${Object.values(singleData)[0]}`} className="icon-btn fa-solid fa-solid fa-pen-to-square"></Link>
                <button
                  className="icon-btn fa-solid fa-trash"
                  onClick={() => {
                    handleDelete(Object.values(singleData)[0], `¿Desea eliminar ${Object.values(singleData)[1]}?`);
                  }}></button>
              </td>
            </tr>
          ))}
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

export default TableComponent;
