import React, { useEffect, useState } from "react";
import './ItemListContainer.css'; // Importar los estilos CSS
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
  const [showDormitoriosOptions, setShowDormitoriosOptions] = useState(false); // Estado para controlar la visibilidad del selector de dormitorios
  const [showBaniosOptions, setShowBaniosOptions] = useState(false); // Estado para controlar la visibilidad del selector de baños

  const fetchAlojamientos = "http://localhost:3001/alojamiento/getAlojamientos";
  const fetchTipos = "http://localhost:3001/tiposAlojamiento/getTiposAlojamiento/";

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const togglePricePopup = () => {
    setShowPricePopup(!showPricePopup);
  };

  const toggleDormitoriosOptions = () => {
    setShowDormitoriosOptions(!showDormitoriosOptions);
  };

  const toggleBaniosOptions = () => {
    setShowBaniosOptions(!showBaniosOptions);
  };

  const handleDormitoriosSelect = (value) => {
    setCountDormitorios(parseInt(value));
    setShowDormitoriosOptions(false); // Ocultar el selector de dormitorios después de seleccionar
  };

  const handleBaniosSelect = (value) => {
    setCountBanios(parseInt(value));
    setShowBaniosOptions(false); // Ocultar el selector de baños después de seleccionar
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
      <div className="flex-space2 crud-inputs">
        <select name="tipoAlojamiento" id="" onChange={handleFilter} className="crud-input">
          <option value="">Tipo</option>
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

        {/* Botón "Precio" que muestra/oculta la ventana emergente */}
        <div className="price-container">
          <button className="crud-input" onClick={togglePricePopup}>
            Precio
          </button>
          {showPricePopup && (
            <div className="price-popup">
              <input
                type="range"
                name="rangoPrecio"
                min="0"
                max="13000"
                step="1"
                value={filter.rangoPrecio || 0}
                onChange={handleFilter}
              />
              <p>Precio seleccionado: {filter.rangoPrecio || 0}</p>
            </div>
          )}
        </div>

        {/* Selector de dormitorios */}
        <div className="price-container">
          <button className="crud-input" onClick={toggleDormitoriosOptions}>
            Dormitorios
          </button>
          {showDormitoriosOptions && (
            <div className="price-popup square-options">
              <p>Seleccione cantidad de dormitorios:</p>
              <div className="options-container">
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <div
                    key={option}
                    className={`option ${countDormitorios === option ? 'selected' : ''}`}
                    onClick={() => handleDormitoriosSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selector de baños */}
        <div className="price-container">
          <button className="crud-input" onClick={toggleBaniosOptions}>
            Baños
          </button>
          {showBaniosOptions && (
            <div className="price-popup square-options">
              <p>Seleccione cantidad de baños:</p>
              <div className="options-container">
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <div
                    key={option}
                    className={`option ${countBanios === option ? 'selected' : ''}`}
                    onClick={() => handleBaniosSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
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
