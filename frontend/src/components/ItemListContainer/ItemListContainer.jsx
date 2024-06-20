import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { getData } from "../../utils/api";
// import Loading from "../Loading/Loading";

const ItemListContainer = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationsType, setAccommodationsType] = useState([]);
  const [countDormitorios, setCountDormitorios] = useState(0);
  const [countBanios, setCountBanios] = useState(0);
  const [filter, setFilter] = useState({});

  const fetchAlojamientos = "http://localhost:3001/alojamiento/getAlojamientos";
  const fetchTipos = "http://localhost:3001/tiposAlojamiento/getTiposAlojamiento/";

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = accommodations.filter((accommodation) => {
    return (
      (!filter.rangoPrecio || parseInt(filter.rangoPrecio) === 0 || accommodation.PrecioPorDia <= parseInt(filter.rangoPrecio)) &&
      (!filter.Estado || accommodation.Estado === filter.Estado) &&
      (!filter.tipoAlojamiento || accommodation.idTipoAlojamiento === parseInt(filter.tipoAlojamiento)) &&
      (!filter.Dormitorios || accommodation.CantidadDormitorios <= parseInt(filter.Dormitorios)) &&
      (!filter.Banios || accommodation.CantidadBanios <= parseInt(filter.Banios))
    );
  });

  useEffect(() => {
    getData(fetchAlojamientos)
      .then((res) => setAccommodations(res))
      .catch((err) => console.error(`${err}: no se encuentra informacion`));

    getData(fetchTipos)
      .then((res) => setAccommodationsType(res))
      .catch((err) => console.error(`${err}: no se encuentra informacion`));

    setFilter((prev) => ({
      ...prev,
      Dormitorios: countDormitorios,
      Banios: countBanios,
    }));
  }, [countDormitorios, countBanios]);

  const maxPrecio = accommodations.reduce((prev, current) => (prev.PrecioPorDia > current.PrecioPorDia ? prev : current), accommodations[0]);
  const minPrecio = accommodations.reduce((prev, current) => (prev.PrecioPorDia < current.PrecioPorDia ? prev : current), accommodations[0]);

  return (
    <>
      <section id="explorar" className="content-section m-y">
        <h2 className="section-title">Encontrá tu Lugar</h2>
        <hr />
        <p>
          Ya sea que estés planeando unas vacaciones relajantes en la playa, una escapada romántica en la montaña o un viaje lleno de aventuras en la
          ciudad, estamos aquí para hacer que tu experiencia sea inolvidable.
        </p>

        <div className="flex-space filter">
          <select name="tipoAlojamiento" onChange={handleFilter} className="crud-input">
            <option value="">Tipo de Propiedad</option>
            {accommodationsType &&
              accommodationsType.map((type) => (
                <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                  {type.Descripcion}
                </option>
              ))}
          </select>

          <select name="Estado" id="" onChange={handleFilter} className="crud-input">
            <option value="">Disponibilidad</option>
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
          </select>

          <div className="crud-input range">
            <label htmlFor="rangoPrecio">Precio</label>
            <input
              type="range"
              name="rangoPrecio"
              min={minPrecio && minPrecio.PrecioPorDia}
              max={maxPrecio && maxPrecio.PrecioPorDia}
              step="1"
              onChange={handleFilter}
              className="input-range"
            />
            <span> ${filter.rangoPrecio}</span>
          </div>

          <div className="crud-input">
            <label htmlFor="Dormitorios">Dormitorios</label>
            <div className="count-control">
              <button
                className="count-button signo"
                disabled={countDormitorios <= 0 ? true : false}
                onClick={() => setCountDormitorios((prev) => prev - 1)}>
                -
              </button>
              <input type="hidden" name="Dormitorios" value={countDormitorios} onChange={handleFilter} />
              <p className="count-input">{countDormitorios > 0 ? countDormitorios : ""}</p>
              <button className="count-button signo" onClick={() => setCountDormitorios((prev) => prev + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="precio crud-input">
            <label htmlFor="Banios">Baños</label>
            <div className="count-control">
              <button className="count-button signo" disabled={countBanios <= 0 ? true : false} onClick={() => setCountBanios((prev) => prev - 1)}>
                -
              </button>
              <input type="hidden" name="Banios" value={countBanios} onChange={handleFilter} />
              <p className="count-input">{countBanios > 0 ? countBanios : ""}</p>
              <button className="count-button signo" onClick={() => setCountBanios((prev) => prev + 1)}>
                +
              </button>
            </div>
          </div>
        </div>
        {filteredData.length > 0 ? <ItemList list={filteredData} /> : <p>No se encuentran alojamientos con esas especificaciones</p>}
      </section>
    </>
  );
};

export default ItemListContainer;
