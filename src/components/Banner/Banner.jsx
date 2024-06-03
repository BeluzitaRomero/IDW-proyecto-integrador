import React from "react";

const Banner = ({ imagen, titulo }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${imagen})`,
      }}
    >
      <h1 className="main-title fade-in-bck">{titulo}</h1>
    </div>
  );
};

export default Banner;
