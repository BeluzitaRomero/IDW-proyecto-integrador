import React, { useState } from "react";
import adminImg from "../../assets/img/banner-admin.jpg";
import Banner from "../../components/Banner/Banner";
import "./Administration.css";
import AccommodationTab from "../../components/Tabs/AccommodationTab/AccommodationTab";
import AccommodationTypeTab from "../../components/Tabs/AccommodationTypeTab/AccommodationTypeTab";
import ServicesTab from "../../components/Tabs/ServicesTab/ServicesTab";
import AccommodationsServicesTab from "../../components/Tabs/AccommodationsServicesTab/AccommodationsServicesTab";

const Administration = () => {
  const [activeTab, setActiveTab] = useState("alojamientos");

  const tableUrl = "http://localhost:3001/";

  const renderTabContent = () => {
    switch (activeTab) {
      case "alojamientos":
        return <AccommodationTab tableUrl={tableUrl} />;
      case "alojamientosTipo":
        return <AccommodationTypeTab tableUrl={tableUrl} />;
      case "alojamientos-servicios":
        return <AccommodationsServicesTab tableUrl={tableUrl} />;
      case "servicios":
        return <ServicesTab tableUrl={tableUrl} />;
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
          <button className="tab-btn underline" onClick={() => setActiveTab("servicios")}>
            Servicios
          </button>
          <button className="tab-btn underline" onClick={() => setActiveTab("alojamientosTipo")}>
            Tipos de Alojamiento
          </button>
          <button className="tab-btn underline" onClick={() => setActiveTab("alojamientos-servicios")}>
            Alojamientos-Servicios
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </main>
    </>
  );
};

export default Administration;
