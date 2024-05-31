import React, { useEffect, useState } from "react";
import dataJson from "../../data/accommodations.json";
import AccommodationDetail from "../../pages/AccommodationDetail/AccommodationDetail";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { getAccommodationDetail } from "../../utils/api";

const AccommodationDetailContainer = () => {
  const [accommodation, setAccommodation] = useState();
  const { alojamientoId } = useParams();

  useEffect(() => {
    getAccommodationDetail(dataJson, alojamientoId)
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
