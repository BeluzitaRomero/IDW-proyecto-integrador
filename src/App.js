import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Institutional from "./pages/Institutional/Institutional";
import Contact from "./pages/Contact/Contact";
import AccomodationDetailContainer from "./components/AccomodationDetailContainer/AccomodationDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Administracion/administracion";

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
            element={<AccomodationDetailContainer />}
          />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/administracion" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
