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
import { Map, AdvancedMarker, APIProvider} from "@vis.gl/react-google-maps";
import { getData } from "../../utils/api";

const AccommodationDetail = ({ item }) => {  
  const [ciudad, setCiudad] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [accommodationType, setAccommodationType] = useState({});
  
  const [markerLocation, setMarkerLocation] = useState({    
    lat: parseFloat(item.Latitud),
    lng: parseFloat(item.Longitud),
  });

    const fetchUrl = `http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/${item.idTipoAlojamiento}`;

  useEffect(() => {
    getData(fetchUrl)
      .then((res) => setAccommodationType(res))
      .catch((err) => console.error(`${err}: no encontrado`));
  }, [accommodationType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerCiudad(item.Latitud, item.Longitud)
      .then((res) => setCiudad(res))
      .catch((err) => console.error("Error:", err));
  }, [item.Latitud, item.Longitud]);

  return (
    <>
      {/* <Banner
        imagen={
          item.imagenes.find((element) => element.cover === true).rutaArchivo
        }
      /> */}
      <main className="m-y">
        <section className="title-container flex-col">
          <div className="title-section flex-col">
            <h1 className="main-title">{item.Titulo}</h1>
            <h2 className="alter-title">
              {item.Estado ? "Disponible" : "Reservado"} • $
              {item.PrecioPorDia} por dia
            </h2>
          </div>
        </section>
        <section className="detail-container">
          <div className="detail-section flex-col">
            <h3 className="alter-title">
              {accommodationType.Descripcion} • {ciudad}
            </h3>
            <p>{item.Descripcion}</p>
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
                    <span className="bold"> {item.CantidadDormitorios}</span>
                  </p>
                </div>

                <div className="icon-container">
                  <img src={toiletIcon} alt="Baños" />
                  <p className="">
                    Cantidad de Baños:
                    <span className="bold"> {item.CantidadBanios}</span>
                  </p>
                </div>
                <div className="services flex-col">
                  <h4 className="alter-title">Servicios:</h4>
                  {/* {item.Servicios.map((servicio) => (
                    <p>{servicio.Nombre}</p>
                  ))} */}
                </div>
                <div className="services flex-col">
                  <h4 className="alter-title">Ubicación:</h4>
                </div>
                <div className="map-container">                
                  <APIProvider apiKey={"AIzaSyDZmqbRMOVEJcGQj7g9Ssin-wWcYPMGoxM"}>
                    <Map defaultZoom={13} defaultCenter={markerLocation} gestureHandling={"greedy"} disableDefaultUI mapId="MAP_ID">
                      <AdvancedMarker position={markerLocation} />
                    </Map>
                  </APIProvider>
              </div>
              </>
            )}
          </div>
          {/* <Slider {...carouselSettings} className="slider-container">
            {item.imagenes.map((imagen) => (
              <div>
                <img src={imagen.rutaArchivo} alt="" />
              </div>
            ))}
          </Slider> */}
        </section>
      </main>
    </>
  );
};

export default AccommodationDetail;
