import React, { useEffect, useState } from "react";
import dataJson from "../../data/accommodations.json";
import AccomodationDetail from "../../pages/AccomodationDetail/AccomodationDetail";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";

const AccomodationDetailContainer = () => {
  const [accommodation, setAccommodation] = useState();
  const { alojamientoId } = useParams();

  useEffect(() => {
    const getAccommodationDetail = (data) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.length) {
            resolve(
              data.find(
                (accomodation) =>
                  accomodation.idAlojamiento === parseInt(alojamientoId)
              )
            );
          } else {
            reject("Error");
          }
        }, 2000);
      });

    getAccommodationDetail(dataJson)
      .then((res) => setAccommodation(res))
      .catch((err) => console.error(`${err}: no encontrado`));
  }, []);
  return (
    <>
      {accommodation ? (
        <AccomodationDetail item={accommodation} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AccomodationDetailContainer;
