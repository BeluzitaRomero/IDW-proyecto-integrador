import React from "react";
import TableComponent from "../../TableComponent/TableComponent";

const AccommodationTypeTab = ({ tableUrl }) => {
  return (
    <>
      <TableComponent
        titles={["Id", "Descripción"]}
        tableGet={`${tableUrl}tiposAlojamiento/getTiposAlojamiento`}
        tableDelete={`${tableUrl}tiposAlojamiento/deleteTipoAlojamiento/`}
        tableName="Tipos de Alojamientos"
        tableParam="tipos-alojamientos"
      />
    </>
  );
};

export default AccommodationTypeTab;
