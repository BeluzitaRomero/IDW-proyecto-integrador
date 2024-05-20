import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";

import { getAccommodations } from "../../utils/api";
import dataJson from "../../data/accommodations.json";
import Button from "../Button/Button";

const ItemListContainer = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    getAccommodations(dataJson)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`${err}: no se encuentra informacion`));
  }, []);

  return (
    <>
      <section id="explorar" className="content-section m-y">
        <h2 className="section-title">Estas en IDW. Estas en casa</h2>
        <hr />
        <p>
          Ya sea que estés planeando unas vacaciones relajantes en la playa, una
          escapada romántica en la montaña o un viaje lleno de aventuras en la
          ciudad, estamos aquí para hacer que tu experiencia sea inolvidable.
        </p>

        {accommodations.length ? (
          <ItemList list={accommodations} />
        ) : (
          /* Este P es una chotada, pero es provisorio solo para simular el tiempo de carga esperando la respuesta*/
          <p>Cargando...</p>
        )}

        <Button className="btn secondary-button" value="Ver mas"></Button>
      </section>
    </>
  );
};

export default ItemListContainer;
