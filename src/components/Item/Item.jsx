import React from "react";
import bedIcon from "../../assets/img/bed-icon.webp";
import "./Item.css";

const Item = ({ item }) => {
  return (
    <article className="card tilt">
      <figure>
        <img src={item.cover_img} alt="Alojamiento" />
        {item.available ? (
          <figcaption className="available">Disponible</figcaption>
        ) : (
          <figcaption className="no-available">Reservado</figcaption>
        )}
      </figure>
      <div className="card-container">
        <p className="card-category italic">{item.category}</p>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-detail">{item.location}</p>
      </div>
      <div className="card-details">
        <div className="icon-container">
          <img src={bedIcon} alt="Habitaciones" />
          <p className="rooms">{item.number_of_rooms}</p>
        </div>
        <p className="card-price bold">{item.price}</p>
      </div>
    </article>
  );
};

export default Item;
