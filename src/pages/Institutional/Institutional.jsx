import React from "react";
import "./Institutional.css";
import eleginos from "../../assets/img/pqelegirnos.webp";
import sustentable from "../../assets/img/sustentable.webp";
import Banner from "../../components/Banner/Banner";
import bgImg from "../../assets/img/banner-institucional.jpg";

const Institutional = () => {
  return (
    <>
      <main className="main-content">
        <Banner imagen={bgImg} titulo="Institucional" />
        <section className="content-section m-y">
          <h2 className="section-title">Nuestra misión</h2>
          <hr />
          <p>
            Queremos brindarle más que simplemente un lugar donde descansar; nos
            esforzamos por crear recuerdos inolvidables que perduren mucho
            después de su partida. Con una atención meticulosa a cada detalle
            estamos comprometidos a garantizar que su estancia sea inolvidable.
          </p>
        </section>
      </main>
      <section className="institutional-section">
        <figure>
          <img src={eleginos} alt="Gente trabajando" />
        </figure>
        <div>
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <h3 className="alter-title">excelencia • relajo</h3>
          <hr />
          <p>
            Esperamos que encuentre en nosotros no solo un lugar donde alojarse,
            sino también un
            <span className="bold italic"> hogar lejos de casa</span> donde
            pueda relajarse, rejuvenecer y crear recuerdos inolvidables. Estamos
            aquí para hacer que su estancia sea perfecta en todos los sentidos.
          </p>
        </div>
      </section>
      <section className="institutional-section">
        <figure>
          <img src={sustentable} alt="Apoyamos la sustentabilidad" />
        </figure>
        <div>
          <h2 className="section-title">Alojamiento sustentable</h2>
          <h3 className="alter-title">responsabilidad • sustentabilidad</h3>
          <hr />
          <p>
            Nos esforzamos por mantener altos estándares de sostenibilidad y
            <span className="bold italic"> responsabilidad social.</span> Desde
            prácticas de conservación de energía hasta la colaboración con la
            comunidad local, estamos comprometidos con el turismo responsable.
            Cuando elige hospedarse con nosotros, no solo está eligiendo una
            experiencia de alojamiento excepcional, sino también contribuyendo a
            un <span className="bold italic">futuro más sostenible </span>y
            equitativo para todos.
          </p>
        </div>
      </section>
      <section className="content-section m-y m-x">
        <h2 className="section-title m-y center-text">
          "En nuestro compromiso con la excelencia, priorizamos la comodidad, la
          autenticidad y la satisfacción de nuestros huéspedes en cada
          experiencia de alojamiento que ofrecemos."
        </h2>
        <h3 className="alter-title">John Doe - CEO</h3>
      </section>
    </>
  );
};

export default Institutional;
