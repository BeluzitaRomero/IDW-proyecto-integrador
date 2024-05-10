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

/* El setTimeout lo pongo aca solamente como para
    simular un tiempo de respuesta de cuando se pide la data
    y que tenga un pequelo rendering condicional con un ternario en el
    componente "container" para que mientras se procesa la peticion
    el usuario vea un spinner o un mensaje de carga. */
