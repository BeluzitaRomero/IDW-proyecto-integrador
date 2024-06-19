import React, { useEffect, useState } from "react";
import bedIcon from "../../assets/img/bed-icon.webp";
import { Link } from "react-router-dom";
import { getData } from "../../utils/api";
import "./Item.css";
import AddDefaultImg from "../DefaultImage/DefaultImage";
import { obtenerCiudad } from "../../utils/api";

const Item = ({ item }) => {
  //Agregado de esto para poder transformar latitud y longitud en ciudad
  //la funcion esta definida en utils
  const [ciudad, setCiudad] = useState(null);
  const [accommodationType, setAccommodationType] = useState();

  const fetchUrl = `http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${item.idTipoAlojamiento}`;

  useEffect(() => {
    getData(fetchUrl)
      .then((res) => setAccommodationType(res))
      .catch((err) => console.error(`${err}: no encontrado`));
  }, [fetchUrl]);

  useEffect(() => {
    obtenerCiudad(item.Latitud, item.Longitud)
      .then((res) => setCiudad(res))
      .catch((err) => console.error("Error:", err));
  }, [item.Latitud, item.Longitud]);

  return (
    <article className="card tilt">
      <Link to={`/alojamiento/${item.idAlojamiento}`} className="link">
        <div className="card-container">
          <figure>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s" alt={item.Titulo} />
            {item.Estado === "Disponible" ? (
              <figcaption className="available">Disponible</figcaption>
            ) : (
              <figcaption className="no-available">Reservado</figcaption>
            )}
          </figure>
          <div className="card-info">
            <p className="card-category italic">{accommodationType && accommodationType.Descripcion}</p>
            <h3 className="card-title">{item.Titulo}</h3>
            <p className="card-location">{ciudad ? ciudad : "Cargando"}</p>
          </div>
        </div>
        <div className="card-details flex-space">
          <div className="icon-container">
            <img src={bedIcon} alt="Habitaciones" />
            <p className="rooms">{item.CantidadDormitorios}</p>
          </div>
          <p className="card-price bold">{item.PrecioPorDia}</p>
        </div>
      </Link>
    </article>
  );
};

export default Item;
