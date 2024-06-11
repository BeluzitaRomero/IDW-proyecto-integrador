import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TableComponent.css";
import Modal from "../Modal/Modal";

const TableComponent = ({
  titles,
  tableGet,
  tableDelete,
  tableName,
  tableParam,
}) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalMessage, setModalMessage] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${tableGet}`);
      setData(response.data);
    } catch (error) {
      console.error("Error al recuperar los datos:", error);
    }
  };

  const handleDelete = (id, message) => {
    setModal(true);
    setModalId(id);
    setModalMessage(message);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await axios.delete(`${tableDelete}/${id}`);
    } catch (error) {
      console.error("Error al eliminar el dato:", error);
    }
    setModal(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [tableGet]);

  return (
    <>
      <div className="flex-space">
        <h2 className="section-title">Listado de {tableName}</h2>
        <Link to={`/agregar/${tableParam}`} className="btn secondary-button">
          Agregar +
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((singleData, index) => (
            <tr key={index}>
              {Object.values(singleData).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              <td className="flex-center">
                {tableName === "Alojamientos" && (
                  <Link
                    to={`/alojamiento/${Object.values(singleData)[0]}`}
                    className="icon-btn fa-solid fa-arrow-up-right-from-square"
                  ></Link>
                )}
                <Link
                  to={`/editar/${tableParam}/${Object.values(singleData)[0]}`}
                  className="icon-btn fa-solid fa-solid fa-pen-to-square"
                ></Link>
                <button
                  className="icon-btn fa-solid fa-trash"
                  onClick={() => {
                    handleDelete(
                      Object.values(singleData)[0],
                      `¿Desea eliminar ${Object.values(singleData)[1]}?`
                    );
                  }}
                ></button>
              </td>
            </tr>
          ))}
          {modal && (
            <Modal
              accept={() => handleDeleteConfirm(modalId)}
              cancel={() => setModal(false)}
            >
              <p>{modalMessage}</p>
            </Modal>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;
