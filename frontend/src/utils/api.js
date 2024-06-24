import axios from "axios";
import { geocode } from "react-geocode";

export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    await axios.delete(url);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export function obtenerCiudad(latitud, longitud) {
  return geocode("latlng", `${latitud},${longitud}`, {
    key: "AIzaSyDZmqbRMOVEJcGQj7g9Ssin-wWcYPMGoxM",
  })
    .then((response) => {
      if (!response) {
        throw new Error("Error al obtener la respuesta de la API");
      }
      return response;
    })
    .then((data) => {
      const city = data.results[0].address_components[3].long_name;
      return city;
    })
    .catch((error) => {
      console.error("Error al obtener la ciudad:", error);
      return null;
    });
}
