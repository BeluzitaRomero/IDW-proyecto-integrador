import React from "react";
import { useParams } from "react-router-dom";
import FormAccommodation from "./FormAccommodation/FormAccommodation";
import FormAccommodationType from "./FormAccommodationType/FormAccommodationType";
import Banner from "../Banner/Banner";
import adminImg from "../../assets/img/banner-admin.jpg";
import FormService from "./FormService/FormService";

const FormComponent = () => {
  const { formComponent } = useParams();
  const { formId } = useParams();

  const renderForm = () => {
    switch (formComponent) {
      case "alojamientos":
        return <FormAccommodation id={formId} />;
      case "tipos-alojamientos":
        return <FormAccommodationType id={formId} />;
      case "servicios":
        return <FormService id={formId} />;
      default:
        return null;
    }
  };
  return (
    <>
      <Banner imagen={adminImg} titulo="Formulario" />
      {renderForm()}
    </>
  );
};

export default FormComponent;
