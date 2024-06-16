import React, { useState } from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import adminImg from "../../assets/img/banner-admin.jpg";
import Banner from "../../components/Banner/Banner";
import "./Administration.css";
import AccomodationTab from "../../components/Tabs/AccommodationTab/AccomodationTab";
import AccommodationTypeTab from "../../components/Tabs/AccommodationTypeTab/AccommodationTypeTab";

const Administration = () => {
  const [activeTab, setActiveTab] = useState("alojamientos");

  const tableUrl = "http://localhost:3001/";

  const renderTabContent = () => {
    switch (activeTab) {
      case "alojamientos":
        return <AccomodationTab tableUrl={tableUrl} />;
      case "alojamientosTipo":
        return <AccommodationTypeTab tableUrl={tableUrl} />;
      case "servicios":
        return (
          <TableComponent
            titles={["Id", "Nombre"]}
            tableGet={`${tableUrl}servicio/getAllServicios`}
            tableDelete={`${tableUrl}servicio/deleteServicio/`}
            tableName="Servicios"
            tableParam="servicios"
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
          <button className="tab-btn underline" onClick={() => setActiveTab("alojamientos")}>
            Alojamientos
          </button>
          <button className="tab-btn underline" onClick={() => setActiveTab("alojamientosTipo")}>
            Tipos de Alojamiento
          </button>
          <button className="tab-btn underline" onClick={() => setActiveTab("servicios")}>
            Servicios
          </button>
          <button className="tab-btn underline" onClick={() => setActiveTab("servicios")}>
            Imagenes
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </main>
    </>
  );
};

export default Administration;
