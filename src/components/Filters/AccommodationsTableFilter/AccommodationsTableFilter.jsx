import React from "react";
import "./AccommodationsTableFilter.css";

const AccommodationsTableFilter = ({ accommodationsType, handleFilter }) => {
  return (
    <div className="flex-space filter">
      <input type="text" placeholder="Titulo" name="Titulo" onChange={handleFilter} className="filter-input" />
      <input type="text" placeholder="Descripcion" name="Descripcion" onChange={handleFilter} className="filter-input" />
      <select name="tipoAlojamiento" onChange={handleFilter} className="filter-input">
        <option value="">Tipo</option>
        {accommodationsType &&
          accommodationsType.map((type) => (
            <option key={type.idTipoAlojamiento} value={type.idTipoAlojamiento}>
              {type.Descripcion}
            </option>
          ))}
      </select>
      <select name="Estado" onChange={handleFilter} className="filter-input">
        <option value="">Estado</option>
        <option value="Disponible">Disponible</option>
        <option value="Reservado">Reservado</option>
      </select>
    </div>
  );
};

export default AccommodationsTableFilter;
