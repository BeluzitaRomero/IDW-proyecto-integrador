import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Institutional from "./pages/Institutional/Institutional";
import Contact from "./pages/Contact/Contact";
import AccommodationDetailContainer from "./components/AccommodationDetailContainer/AccommodationDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administration from "./pages/Administration/Administration.jsx";
import { useEffect } from "react";
import FormComponent from "./components/FormComponents/FormComponent.jsx";
// import FormAccommodation from "./FormAccommodation/FormAccommodation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institucional" element={<Institutional />} />
          <Route
            path="/alojamiento/:alojamientoId"
            element={<AccommodationDetailContainer />}
          />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/administrar" element={<Administration />} />
          <Route path="/agregar/:formComponent" element={<FormComponent />} />
          <Route
            path="/editar/:formComponent/:formId"
            element={<FormComponent />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
