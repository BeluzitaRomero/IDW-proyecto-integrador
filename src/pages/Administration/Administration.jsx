import React, { useState } from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import adminImg from "../../assets/img/banner-admin.jpg";
import Banner from "../../components/Banner/Banner";
import "./Administration.css";

const Administration = () => {
  const [activeTab, setActiveTab] = useState("alojamientos");

  const tableUrl = "http://localhost:3001/";

  const renderTabContent = () => {
    switch (activeTab) {
      case "alojamientos":
        return (
          <TableComponent
            titles={[
              "Id",
              "Titulo",
              "Descripción",
              "Latitud",
              "Longitud",
              "Precio",
              "Dormitorios",
              "Baños",
              "Disponible",
              "Tipo",
              "Acciones",
            ]}
            tableGet={`${tableUrl}alojamiento/getAlojamientos`}
            tableDelete={`${tableUrl}alojamiento/deleteAlojamiento/`}
            tableName="Alojamientos"
            tableParam="alojamientos"
          />
        );
      case "alojamientosTipo":
        return (
          <TableComponent
            titles={["Id", "Descripción", "Acciones"]}
            tableGet={`${tableUrl}tiposAlojamiento/getTiposAlojamiento`}
            tableDelete={`${tableUrl}tiposAlojamiento/deleteTipoAlojamiento/`}
            tableName="Tipos de Alojamientos"
            tableParam="tipos-alojamientos"
          />
        );
      case "servicios":
        return (
          <TableComponent
            titles={["Id", "Nombre", "Acciones"]}
            tableGet={`${tableUrl}servicio/getAllServicios`}
            tableDelete={`${tableUrl}servicio/deleteServicio/`}
            tableName="Servicios"
            tableParam="servicios"
          />
        );
      case "alojamientos-servicios":
        return (
          //Aca no deberia tener el boton de agregar y modificar
          <TableComponent
            titles={[
              "Id alojamiento servicio",
              "Id Alojamiento",
              "Servicio",
              "Acciones",
            ]}
            tableGet={`${tableUrl}alojamientosServicios/getAllAlojamientoServicios`}
            tableDelete={`${tableUrl}alojamientosServicios/deleteAlojamientoServicio/`}
            tableName="Alojamientos Servicios"
            tableParam="alojamientos-servicios"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Banner imagen={adminImg} titulo="Administrador de alojamientos" />
      <main className="m-y main-content">
        <div className="tabs">
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("alojamientos")}
          >
            Alojamientos
          </button>
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("alojamientosTipo")}
          >
            Tipos de Alojamiento
          </button>
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("servicios")}
          >
            Servicios
          </button>
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("alojamientos-servicios")}
          >
            Alojamientos-Servicios
          </button>
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("servicios")}
          >
            Imagenes
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </main>
    </>
  );
};

export default Administration;
