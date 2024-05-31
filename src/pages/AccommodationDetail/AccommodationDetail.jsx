import React, { useState, useEffect } from "react";
import { obtenerCiudad } from "../../utils/api";
import Banner from "../../components/Banner/Banner";
import "./AccommodationDetail.css";
import bedIcon from "../../assets/img/bed-icon.webp";
import toiletIcon from "../../assets/img/toilet-icon.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselSettings } from "../../utils/carouselSettings";

const AccommodationDetail = ({ item }) => {
  const [ciudad, setCiudad] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerCiudad(item.ubicacion.latitud, item.ubicacion.longitud)
      .then((res) => setCiudad(res))
      .catch((err) => console.error("Error:", err));
  }, [item.ubicacion.latitud, item.ubicacion.longitud]);

  return (
    <>
      <Banner
        imagen={
          item.imagenes.find((element) => element.cover === true).rutaArchivo
        }
      />
      <main className="m-y">
        <section className="title-container flex-col">
          <div className="title-section flex-col">
            <h1 className="main-title">{item.titulo}</h1>
            <h2 className="alter-title">
              {item.disponible ? "Disponible" : "Reservado"} • $
              {item.precioPorDia} por dia
            </h2>
          </div>
        </section>
        <section className="detail-container">
          <div className="detail-section flex-col">
            <h3 className="alter-title">
              {item.tipoAlojamiento} • {ciudad}
            </h3>
            <p>{item.descripcion}</p>
            <div className="toggle-container">
              <h4 className="alter-title">ver caracteristícas</h4>
              <button
                className={`icon-btn fa-solid fa-chevron-right ${
                  toggle ? "rotate" : "unrotate"
                }`}
                onClick={() => setToggle(!toggle)}></button>
            </div>
            {toggle && (
              <>
                <div className="icon-container">
                  <img src={bedIcon} alt="Habitaciones" />
                  <p className="">
                    Cantidad de Dormitorios:
                    <span className="bold"> {item.cantidadDormitorios}</span>
                  </p>
                </div>

                <div className="icon-container">
                  <img src={toiletIcon} alt="Baños" />
                  <p className="">
                    Cantidad de Baños:
                    <span className="bold"> {item.cantidadBanios}</span>
                  </p>
                </div>
                <div className="services flex-col">
                  <h4 className="alter-title">Servicios:</h4>
                  {item.servicios.map((servicio) => (
                    <p>{servicio.nombre}</p>
                  ))}
                </div>
              </>
            )}
          </div>
          <Slider {...carouselSettings} className="slider-container">
            {item.imagenes.map((imagen) => (
              <div>
                <img src={imagen.rutaArchivo} alt="" />
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </>
  );
};

export default AccommodationDetail;
