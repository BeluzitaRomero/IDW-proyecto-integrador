import React from "react";
import loadingAnimation from "../../assets/img/loadingAnimation.svg";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingAnimation} alt="" />
    </div>
  );
};

export default Loading;
