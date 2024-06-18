import React, { useState, useEffect } from "react";
import { getData } from "../../../utils/api";
import AccommodationTable from "../../TableComponent/AccommodationTable/AccommodationTable";

const AccommodationTab = ({ tableUrl }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationsType, setAccommodationsType] = useState();
  const [accommodationsFull, setAccommodationsFull] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const responseAlojamientos = await getData(`${tableUrl}alojamiento/getAlojamientos`);
    //     responseAlojamientos.map(async (accommodation) => {
    //       const responseTipo = await getData(`${tableUrl}tiposAlojamiento/getTipoAlojamiento/${accommodation.idTipoAlojamiento}`);
    //       const full = { ...accommodation, tipoAlojamiento: responseTipo.Descripcion };
    //       setAccommodationsFull(full);
    //       return { ...accommodation, tipoAlojamiento: responseTipo.Descripcion };
    //     });
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //   }
    // };
    // fetchData();

    getData(`${tableUrl}alojamiento/getAlojamientos`)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`Error: ${err}`));

    getData(`${tableUrl}tiposAlojamiento/getTiposAlojamiento/`)
      .then((res) => setAccommodationsType(res))
      .catch((err) => console.error(`Error: ${err}`));
  }, [tableUrl]);

  return (
    <>
      <AccommodationTable accommodations={accommodations} accommodationsType={accommodationsType} />
    </>
  );
};

export default AccommodationTab;
