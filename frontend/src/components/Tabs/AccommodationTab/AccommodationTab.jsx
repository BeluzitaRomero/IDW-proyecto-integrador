import React, { useState, useEffect } from "react";
import { getData, deleteData } from "../../../utils/api";
import AccommodationTable from "../../TableComponent/AccommodationTable/AccommodationTable";

const AccommodationTab = ({ tableUrl }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationsType, setAccommodationsType] = useState();

  useEffect(() => {
    getData(`${tableUrl}alojamiento/getAlojamientos`)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`Error: ${err}`));

    getData(`${tableUrl}tiposAlojamiento/getTiposAlojamiento/`)
      .then((res) => setAccommodationsType(res))
      .catch((err) => console.error(`Error: ${err}`));
  }, [tableUrl]);

  const deleteAccomodation = async (id) => {
    await deleteData(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`);
    const updateData = await getData("http://localhost:3001/alojamiento/getAlojamientos");
    setAccommodations(updateData);
  };
  return (
    <>
      <AccommodationTable accommodations={accommodations} accommodationsType={accommodationsType} deleteAccomodation={deleteAccomodation} />
    </>
  );
};

export default AccommodationTab;
