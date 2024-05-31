import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TableComponent.css";

const TableComponent = ({ titles, tableUrl, tableName, tableParam }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${tableUrl}`);
      setData(response.data);
    } catch (error) {
      console.error("Error al recuperar los datos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`
      );
    } catch (error) {
      console.error("Error al recuperar el dato:", error);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [tableUrl]);

  return (
    <>
      <div className="flex-con">
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
              <td className="flex-con">
                {tableName === "Alojamientos" && (
                  <Link
                    to={`/alojamiento/${Object.values(singleData)[0]}`}
                    className="icon-btn fa-solid fa-arrow-up-right-from-square"></Link>
                )}
                <Link
                  to={`/editar/${tableParam}/${Object.values(singleData)[0]}`}
                  className="icon-btn fa-solid fa-solid fa-pen-to-square"></Link>
                <button
                  className="icon-btn fa-solid fa-trash"
                  onClick={() => {
                    handleDelete(Object.values(singleData)[0]);
                  }}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;
