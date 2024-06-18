import React, { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { getData } from "../../utils/api";
//import dataJson from "../../data/accommodations.json";
import Loading from "../Loading/Loading";

const ItemListContainer = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationsType, setAccommodationsType] = useState();

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

  return (
    <>
      <div className="filtroHome">
        <select name="tipoAlojamiento" id="" onChange={handleFilter} className="">
          <option value="">Tipo</option>
          {accommodationsType &&
            accommodationsType.map((type) => (
              <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                {type.Descripcion}
              </option>
            ))}
        </select>
        <select name="Estado" id="" onChange={handleFilter} className="">
          <option value="">Disponibilidad</option>
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
        <div className="">
          <input type="range" name="rangoPrecio" min="0" max="13000" step="1" onChange={handleFilter} />
          <p>{filter.rangoPrecio}</p>
        </div>
        <div className="flex-center">
          <p>dormitorios</p>
          <button onClick={() => setCountDormitorios((prev) => prev - 1)} disabled={countDormitorios <= 0 ? true : false}>
            -
          </button>
          <input type="hidden" name="Dormitorios" onChange={handleFilter} value={countDormitorios} />
          <p>{countDormitorios}</p>
          <button onClick={() => setCountDormitorios((prev) => prev + 1)}>+</button>
        </div>
        <div className="flex-center">
          <p>baños</p>
          <button onClick={() => setCountBanios((prev) => prev - 1)} disabled={countBanios <= 0 ? true : false}>
            -
          </button>
          <input type="hidden" name="Banios" onChange={handleFilter} value={countBanios} />
          <p>{countBanios}</p>
          <button onClick={() => setCountBanios((prev) => prev + 1)}>+</button>
        </div>
      </div>

      <section id="explorar" className="content-section m-y">
        <h2 className="section-title">Estas en IDW. Estas en casa</h2>
        <hr />
        <p>
          Ya sea que estés planeando unas vacaciones relajantes en la playa, una escapada romántica en la montaña o un viaje lleno de aventuras en la
          ciudad, estamos aquí para hacer que tu experiencia sea inolvidable.
        </p>

        {filteredData ? <ItemList list={filteredData} /> : <Loading />}
      </section>
    </>
  );
};

export default ItemListContainer;
