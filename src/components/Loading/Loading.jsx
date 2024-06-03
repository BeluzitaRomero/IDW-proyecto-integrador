import React from "react";
import loadingAnimation from "../../assets/img/loadingAnimation.svg";
import "./Loading.css";
import { useEffect } from "react";

const Loading = ({ altura }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="loading-container"
      style={{
        height: `${altura}`,
      }}>
      <img src={loadingAnimation} alt="Cargando..." />
    </div>
  );
};

export default Loading;
