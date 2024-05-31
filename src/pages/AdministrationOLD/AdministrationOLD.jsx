import React from "react";
import Banner from "../../components/Banner/Banner";
import { getAccommodations } from "../../utils/api";
import { useEffect, useState } from "react";
import dataJson from "../../data/accommodations.json";
import Loading from "../../components/Loading/Loading";
// import "./Administration.css";
import adminImg from "../../assets/img/banner-admin.jpg";
import { Link } from "react-router-dom";
const Administration = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    getAccommodations(dataJson)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`${err}: no se encuentra info`));
  }, []);
  return (
    <>
      <Banner imagen={adminImg} titulo="Administrador de alojamientos" />
      <main className="m-y main-content">
        <div className="flex-con">
          <h2 className="section-title">Listado de alojamientos</h2>
          <Link to={`/agregar`} className="btn secondary-button">
            Agregar +
          </Link>
        </div>
        {accommodations ? (
          <table>
            <thead>
              <th>Id</th>
              <th>Titulo</th>
              <th>Tipo</th>
              <th>Ubicacion</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              {accommodations.map((accommodation) => (
                <tr key={accommodation.idAlojamiento}>
                  <td className="center-text">{accommodation.idAlojamiento}</td>
                  <td>{accommodation.titulo}</td>
                  <td>{accommodation.tipoAlojamiento}</td>
                  <td>
                    {`${accommodation.ubicacion.latitud}, ${accommodation.ubicacion.longitud}`}
                  </td>
                  <td>{accommodation.precioPorDia}</td>
                  <td className="center-text">
                    {accommodation.disponible ? "Si" : "No"}
                  </td>
                  <td className="flex-con">
                    <Link
                      to={`/alojamiento/${accommodation.idAlojamiento}`}
                      className="icon-btn fa-solid fa-arrow-up-right-from-square"></Link>
                    <Link
                      to={`/editar/${accommodation.idAlojamiento}`}
                      className="icon-btn fa-solid fa-solid fa-pen-to-square"></Link>
                    <button className="icon-btn fa-solid fa-trash"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default Administration;
