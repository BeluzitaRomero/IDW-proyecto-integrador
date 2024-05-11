import React, { useEffect, useState } from "react";
import bedIcon from "../../assets/img/bed-icon.webp";
import "./Item.css";

import { obtenerCiudad } from "../../utils/api";

const Item = ({ item }) => {
  //Agregado de esto para poder transformar latitud y longitud en ciudad
  //la funcion esta definida en utils
  const [ciudad, setCiudad] = useState(null);

  useEffect(() => {
    obtenerCiudad(item.ubicacion.latitud, item.ubicacion.longitud)
      .then((res) => setCiudad(res))
      .catch((err) => console.error("Error:", err));
  }, [item.ubicacion.latitud, item.ubicacion.longitud]);

  return (
    <article className="card tilt">
      <figure>
        <img
          src={
            item.imagenes.find((element) => element.cover === true).rutaArchivo
          }
          alt="Alojamiento"
        />
        {item.disponible ? (
          <figcaption className="available">Disponible</figcaption>
        ) : (
          <figcaption className="no-available">Reservado</figcaption>
        )}
      </figure>
      <div className="card-container">
        <p className="card-category italic">{item.tipoAlojamiento}</p>
        <h3 className="card-title">{item.titulo}</h3>

        <p className="card-detail">{ciudad ? ciudad : "Cargando"}</p>
      </div>
      <div className="card-details">
        <div className="icon-container">
          <img src={bedIcon} alt="Habitaciones" />
          <p className="rooms">{item.cantidadDormitorios}</p>
        </div>
        <p className="card-price bold">{item.precioPorDia}</p>
      </div>
    </article>
  );
};

export default Item;
