import React from "react";
import "./SearchInput.css";

const SearchInput = () => {
  return (
    <section className="search-section">
      <input type="text" placeholder="Buscar..." />
      <button className="btn primary-button">buscar</button>
    </section>
  );
};

export default SearchInput;
