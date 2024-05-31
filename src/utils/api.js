export const getAccommodations = (dataList) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dataList.length) {
        resolve(dataList);
      } else {
        reject("Error");
      }
    }, 2000);
  });

export const getAccommodationDetail = (data, id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.length) {
        resolve(
          data.find(
            (accommodation) => accommodation.idAlojamiento === parseInt(id)
          )
        );
      } else {
        reject("Error");
      }
    }, 2000);
  });

/* El setTimeout lo pongo aca solamente como para
    simular un tiempo de respuesta de cuando se pide la data
    y que tenga un pequelo rendering condicional con un ternario en el
    componente "container" para que mientras se procesa la peticion
    el usuario vea un spinner o un mensaje de carga. */

// Función para obtener la ciudad basada en las coordenadas geográficas
//En el tp la estructura que nos tiran a usar tiene latitud y longitud, por eso
//busque info de como usar una api que convierta esos valores a la ciudad
export function obtenerCiudad(latitud, longitud) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}&zoom=18&addressdetails=1`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la respuesta de la API");
      }
      return response.json();
    })
    .then((data) => {
      const city =
        data.address.city || data.address.suburb || data.address.town;
      return city;
    })
    .catch((error) => {
      console.error("Error al obtener la ciudad:", error);
      return null;
    });
}
