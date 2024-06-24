import React from "react";
import TableComponent from "../../TableComponent/TableComponent";

const AccommodationsServicesTab = ({ tableUrl }) => {
  return (
    <>
      <TableComponent
        titles={["Id alojamiento servicio", "Id Alojamiento", "Servicio"]}
        tableGet={`${tableUrl}alojamientosServicios/getAllAlojamientoServicios`}
        tableDelete={`${tableUrl}alojamientosServicios/deleteAlojamientoServicio/`}
        tableName="Alojamientos Servicios"
        tableParam="alojamientos-servicios"
      />
    </>
  );
};

export default AccommodationsServicesTab;
