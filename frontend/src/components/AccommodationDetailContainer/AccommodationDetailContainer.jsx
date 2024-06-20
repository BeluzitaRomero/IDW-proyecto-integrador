import React, { useEffect, useState } from "react";
import AccommodationDetail from "../../pages/AccommodationDetail/AccommodationDetail";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/api";

const AccommodationDetailContainer = () => {
  const [accommodation, setAccommodation] = useState();
  const { alojamientoId } = useParams();
  const fetchUrl = `http://localhost:3001/alojamiento/getAlojamiento/${alojamientoId}`;

  useEffect(() => {
    getData(fetchUrl)
      .then((res) => setAccommodation(res))
      .catch((err) => console.error(`${err}: no encontrado`));
  }, []);

  return (
    <>
      {accommodation ? (
        <AccommodationDetail item={accommodation} />
      ) : (
        <Loading altura="80vh" />
      )}
    </>
  );
};

export default AccommodationDetailContainer;
