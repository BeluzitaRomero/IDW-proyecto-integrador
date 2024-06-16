import React, { useState, useEffect } from "react";
import { getData } from "../../../utils/api";
import AccomodationTable from "../../TableComponent/AccommodationTable/AccomodationTable";

const AccomodationTab = ({ tableUrl }) => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    getData(`${tableUrl}alojamiento/getAlojamientos`)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`Error: ${err}`));
  }, [tableUrl]);
  return (
    <>
      <AccomodationTable accommodations={accommodations} />
    </>
  );
};

export default AccomodationTab;
