import React from "react";
import TableComponent from "../../TableComponent/TableComponent";

const ServicesTab = ({ tableUrl }) => {
  return (
    <>
      <TableComponent
        titles={["Id", "Descripción"]}
        tableGet={`${tableUrl}servicio/getAllServicios`}
        tableDelete={`${tableUrl}servicio/deleteServicio/`}
        tableName="Servicios"
        tableParam="servicios"
      />
    </>
  );
};

export default ServicesTab;
