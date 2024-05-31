import React, { useState } from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import adminImg from "../../assets/img/banner-admin.jpg";
import Banner from "../../components/Banner/Banner";
import "./Administration.css";

const Administration = () => {
  const [activeTab, setActiveTab] = useState("alojamientos");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "alojamientos":
        return (
          <TableComponent
            titles={[
              "Id",
              "Titulo",
              "Descripcion",
              "Latitud",
              "Longitud",
              "Precio",
              "Dormitorios",
              "Baños",
              "Disponible",
              "Tipo",
              "Acciones",
            ]}
            tableUrl="http://localhost:3001/alojamiento/getAlojamientos"
            tableName="Alojamientos"
            tableParam="alojamientos"
          />
        );
      case "alojamientosTipo":
        return (
          <TableComponent
            titles={["Id", "Descripcion", "Acciones"]}
            tableUrl="http://localhost:3001/tiposAlojamiento/getTiposAlojamiento"
            tableName="Tipos de Alojamientos"
            tableParam="tipos-alojamientos"
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
            onClick={() => setActiveTab("alojamientos")}>
            Alojamientos
          </button>
          <button
            className="tab-btn underline"
            onClick={() => setActiveTab("alojamientosTipo")}>
            Tipos de Alojamiento
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </main>
    </>
  );
};

export default Administration;
