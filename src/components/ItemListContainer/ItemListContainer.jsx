import React, { useEffect, useState } from "react";
import "./ItemListContainer.css"; // Importar los estilos CSS
import ItemList from "../ItemList/ItemList";
import { getData } from "../../utils/api";
import Loading from "../Loading/Loading";

const ItemListContainer = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [accommodationsType, setAccommodationsType] = useState([]);
  const [countDormitorios, setCountDormitorios] = useState(0);
  const [countBanios, setCountBanios] = useState(0);
  const [filter, setFilter] = useState({});
  const [showPricePopup, setShowPricePopup] = useState(false);


  const fetchAlojamientos = "http://localhost:3001/alojamiento/getAlojamientos";
  const fetchTipos = "http://localhost:3001/tiposAlojamiento/getTiposAlojamiento/";

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const togglePricePopup = () => {
    setShowPricePopup(!showPricePopup);
  };



  const filteredData = accommodations.filter((accommodation) => {
    return (
      (!filter.rangoPrecio ||
        parseInt(filter.rangoPrecio) === 0 ||
        accommodation.PrecioPorDia <= parseInt(filter.rangoPrecio)) &&
      (!filter.Estado || accommodation.Estado === filter.Estado) &&
      (!filter.tipoAlojamiento ||
        accommodation.idTipoAlojamiento === parseInt(filter.tipoAlojamiento)) &&
      (!filter.Dormitorios ||
        accommodation.CantidadDormitorios <= parseInt(filter.Dormitorios)) &&
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
      <section id="explorar" className="content-section titulo">
        <h2 className="section-title">Encontrá tu Lugar</h2>
        <p>
          Ya sea que estés planeando unas vacaciones relajantes en la playa, una
          escapada romántica en la montaña o un viaje lleno de aventuras en la
          ciudad, estamos aquí para hacer que tu experiencia sea inolvidable.
        </p>
        <hr />

        {/* Mostrar lista de alojamientos o loading */}
        {filteredData ? <ItemList list={filteredData} /> : <Loading />}
      </section>

      <div className="contenedor m-y">
        <div className="flex-space crud-inputs">
          <div className="input-container">
            <select
              name="tipoAlojamiento"
              id=""
              onChange={handleFilter}
              className="crud-input"
            >
              <option value="">Tipo de Propiedad</option>
              {accommodationsType &&
                accommodationsType.map((type) => (
                  <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
                    {type.Descripcion}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-container">
            <select name="Estado" id="" onChange={handleFilter} className="crud-input">
              <option value="">Disponibilidad</option>
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
            </select>
          </div>

          <div className="input-container">
            {/* Botón "Precio" que muestra/oculta la ventana emergente */}
            <div className="price-container">
              <div className="precio">
                <button className="crud-input" onClick={togglePricePopup}>
                  <label>
                    Precio
                    <input
                      type="range"
                      name="rangoPrecio"
                      min="0"
                      max="500000"
                      step="1"
                      onChange={handleFilter}
                    />
                    <span> ${filter.rangoPrecio || 0}</span>
                  </label>
                </button>
              </div>
            </div>
          </div>

          <div className="input-container dormitorio">
            {/* Selector de Dormitorios */}
            <div className="price-container">
              <div className="precio crud-input">
                <label>
                  <span className="label-dormitorio">Dormitorios</span>
                  <div className="count-control">
                    <button
                      className="count-button"
                      onClick={() => setCountDormitorios((prev) => Math.max(prev - 1, 0))}
                    >
                      <p className="signo">-</p>
                    </button>
                    <input
                      type="text"
                      className="count-input"
                      name="Dormitorios"
                      value={countDormitorios}
                      onChange={handleFilter}
                      onKeyDown={(e) => {
                        // Permite solo números
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault(); // Evita la acción predeterminada de las flechas de arriba/abajo
                        }
                      }}
                    />
                    <button
                      className="count-button"
                      onClick={() => setCountDormitorios((prev) => prev + 1)}
                    >
                      <p className="signo">+</p>
                    </button>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="input-container dormitorio">
            {/* Selector de Baños */}
            <div className="price-container">
              <div className="precio crud-input">
                <label>
                  <span className="label-dormitorio">Baños</span>
                  <div className="count-control">
                    <button
                      className="count-button"
                      onClick={() => setCountBanios((prev) => Math.max(prev - 1, 0))}
                    >
                      <p className="signo">-</p>
                    </button>
                    <input
                      type="text"
                      className="count-input"
                      name="Banios"
                      value={countBanios}
                      onChange={handleFilter}
                      onKeyDown={(e) => {
                        // Permite solo números
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault(); // Evita la acción predeterminada de las flechas de arriba/abajo
                        }
                      }}
                    />
                    <button
                      className="count-button"
                      onClick={() => setCountBanios((prev) => prev + 1)}
                    >
                      <p className="signo">+</p>
                    </button>
                  </div>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ItemListContainer;
