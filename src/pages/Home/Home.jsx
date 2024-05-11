import React from "react";
import MainHome from "../../components/MainHome/MainHome";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";

import "./Home.css";

const Home = () => {
  return (
    <>
      <MainHome />
      <section className="search-section">
        <Input />
        <Button className={"btn primary-button"} value={"Buscar"} />
      </section>

      <ItemListContainer />
    </>
  );
};

export default Home;
