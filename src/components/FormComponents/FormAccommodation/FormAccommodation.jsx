// import React, { useEffect, useState } from "react";
// import Modal from "../../Modal/Modal";
// import { Link } from "react-router-dom";
// import { getData } from "../../../utils/api";
// import axios from "axios";

// const FormAccommodation = ({ id }) => {
//   const [modal, setModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState();

//   //estados para tipos y alojamientos
//   const [types, setTypes] = useState([]);
//   const [dataForm, setDataForm] = useState({
//     Titulo: "",
//     Descripcion: "",
//     Latitud: null,
//     Longitud: null,
//     PrecioPorDia: null,
//     CantidadDormitorios: null,
//     CantidadBanios: null,
//     Estado: "Disponible",
//     TipoAlojamiento: null,
//     idTipoAlojamiento: null,
//   });

//   const fetchUrl = "http://localhost:3001";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDataForm({ ...dataForm, [name]: value });
//   };

//   // Validar que todos los campos obligatorios estén completos
//   const validateForm = () => {
//     return Object.values(dataForm).every((value) => value !== "");
//   };

//   // Limpiar el formulario después de enviar
//   const clearForm = () => {
//     setDataForm({
//       Titulo: "",
//       Descripcion: "",
//       TipoAlojamiento: "",
//       Latitud: "",
//       Longitud: "",
//       PrecioPorDia: "",
//       CantidadDormitorios: "",
//       CantidadBanios: "",
//       Estado: "Disponible",
//     });
//   };

//   useEffect(() => {
//     if (id) {
//       getData(`${fetchUrl}/alojamiento/getAlojamiento/${id}`)
//         .then((res) => setDataForm(res))
//         .catch((err) => console.error(`Error: ${err}`));
//       // getData(`${fetchUrl}/servicio/getAllServicios`)
//       //   .then((res) => setServices(res))
//       //   .catch((err) => console.error(`Error: ${err}`));
//     }

//     getData(`${fetchUrl}/tiposAlojamiento/getTiposAlojamiento`)
//       .then((res) => setTypes(res))
//       .catch((err) => console.error(`Error: ${err}`));

//     // getData(`${fetchUrl}/servicio/getAllServicios`)
//     //   .then((res) => setServices(res))
//     //   .catch((err) => console.error(`Error: ${err}`));
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (id) {
//       axios
//         .put(`${fetchUrl}/alojamiento/putAlojamiento/${id}`, dataForm)
//         .then((response) => {
//           // Manejar la respuesta exitosa aquí si es necesario
//           setModalMessage(
//             `Alojamiento ${id ? "actualizado" : "creado"} con éxito`
//           );
//           setModal(true);
//           clearForm();
//           console.log("La solicitud PUT fue exitosa:", response);
//         })
//         .catch((error) => {
//           // Manejar cualquier error que ocurra durante la solicitud
//           setModalMessage(
//             `Ocurrió un error al ${id ? "actualizar" : "crear"} el alojamiento`
//           );
//           setModal(true);
//           console.error("Hubo un error al realizar la solicitud PUT:", error);
//         });
//     } else {
//       // Validar formulario antes de enviar
//       if (!validateForm()) {
//         setModal(true);
//         setModalMessage("Por favor complete todos los campos correctamente.");
//         return;
//       }
//       fetch(`${fetchUrl}/alojamiento/createAlojamiento`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataForm),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Error al crear el alojamiento");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setModalMessage(
//             `Alojamiento ${id ? "actualizado" : "creado"} con éxito`
//           );
//           clearForm();
//         })
//         .catch((error) => {
//           setModalMessage(
//             `Ocurrió un error al ${id ? "actualizar" : "crear"} el alojamiento`
//           );
//         });
//       setModal(true);
//     }
//   };

//   return (
//     <main className="m-y crud-form">
//       <h2 className="section-title">
//         {id ? "Actualizar" : "Agregar"} Alojamiento
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="Titulo">Titulo</label>
//           <input
//             name="Titulo"
//             type="text"
//             defaultValue={dataForm.Titulo}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Descripcion">Descripción</label>
//           <input
//             name="Descripcion"
//             type="text"
//             defaultValue={dataForm.Descripcion}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="idTipoAlojamiento">Tipo de alojamiento:</label>
//           <select
//             name="TipoAlojamiento"
//             value={dataForm.TipoAlojamiento || ""}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               Seleccione un tipo
//             </option>
//             {types.map((type) => (
//               <option
//                 key={type.idTipoAlojamiento}
//                 value={type.idTipoAlojamiento}
//               >
//                 {type.Descripcion}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="Latitud">Latitud</label>
//           <input
//             name="Latitud"
//             type="number"
//             defaultValue={dataForm.Latitud}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Longitud">Longitud</label>
//           <input
//             name="Longitud"
//             type="number"
//             defaultValue={dataForm.Longitud}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="PrecioPorDia">Precio por día</label>
//           <input
//             name="PrecioPorDia"
//             type="number"
//             defaultValue={dataForm.PrecioPorDia}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="CantidadDormitorios">Cantidad de dormitorios</label>
//           <input
//             name="CantidadDormitorios"
//             type="number"
//             defaultValue={dataForm.CantidadDormitorios}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="CantidadBanios">Cantidad de baños</label>
//           <input
//             name="CantidadBanios"
//             type="number"
//             defaultValue={dataForm.CantidadBanios}
//             onChange={handleChange}
//             min={"0"}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="Estado">Estado:</label>
//           <select
//             name="Estado"
//             value={dataForm.Estado}
//             onChange={handleChange}
//             required
//           >
//             <option value="Disponible">Disponible</option>
//             <option value="Reservado">Reservado</option>
//           </select>
//         </div>
//         <Link to="/administrar" className="btn cancel-button">
//           Volver
//         </Link>
//         <button className="btn accent-button" type="submit">
//           {id ? "Actualizar" : "Agregar"}
//         </button>
//       </form>
//       {modal && (
//         <Modal>
//           {modalMessage}
//           <Link to="/administrar" className="btn secondary-button">
//             Volver
//           </Link>
//         </Modal>
//       )}
//       {dataForm.idAlojamiento && (
//         <Link
//           to={`/agregar-servicios/${dataForm.idAlojamiento}`}
//           className="btn accent-button"
//         >
//           Agregar servicios
//         </Link>
//       )}
//     </main>
//   );
// };

// export default FormAccommodation;
import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { Link } from "react-router-dom";
import { getData } from "../../../utils/api";
import axios from "axios";

const FormAccommodation = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  //estados para tipos y alojamientos
  const [types, setTypes] = useState([]);

  // Estado para los servicios seleccionados
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);

  //Estado para los datos del form de alojamiento
  const [dataForm, setDataForm] = useState({
    Titulo: "",
    Descripcion: "",
    Latitud: "",
    Longitud: "",
    PrecioPorDia: "",
    CantidadDormitorios: "",
    CantidadBanios: "",
    Estado: "Disponible",
    idTipoAlojamiento: "",
  });

  const fetchUrl = "http://localhost:3001";

  // Handle para los input de aloj
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Handle para checkboxes: chequea si hay tildados o no y actualiza el estado
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedServices((prev) => {
      if (checked) {
        if (!prev.includes(parseInt(value))) {
          return [...prev, parseInt(value)];
        }
      } else {
        return prev.filter((idServicio) => idServicio !== parseInt(value));
      }
      return prev;
    });
  };

  //Validar que todos los campos obligatorios estén completos
  const validateForm = () => {
    return Object.values(dataForm).every((value) => value !== "");
  };

  // Limpiar el formulario después de enviar
  const clearForm = () => {
    setDataForm({
      Titulo: "",
      Descripcion: "",
      TipoAlojamiento: "",
      Latitud: "",
      Longitud: "",
      PrecioPorDia: "",
      CantidadDormitorios: "",
      CantidadBanios: "",
      Estado: "Disponible",
    });
    setSelectedServices([]);
  };

  useEffect(() => {
    if (id) {
      // traigo alojamiento
      getData(`${fetchUrl}/alojamiento/getAlojamiento/${id}`)
        .then((res) => setDataForm(res))
        .catch((err) => console.error(`Error: ${err}`));
    }
    //traigo tipos
    getData(`${fetchUrl}/tiposAlojamiento/getTiposAlojamiento`)
      .then((res) => setTypes(res))
      .catch((err) => console.error(`Error: ${err}`));

    //traigo servicios
    getData(`${fetchUrl}/servicio/getAllServicios`)
      .then((res) => setServices(res))
      .catch((err) => console.error(`Error: ${err}`));

    //traigo serivicios asociados a un alojamiento
    getData(`${fetchUrl}/alojamientosServicios/getAlojamientoServicio/${id}`)
      .then((response) => {
        setSelectedServices(response.map((service) => service.idServicio));
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // CASO IF: cuando hay un id de alojamiento existente, hace put de aloj
      // y busca servicios asociados para borrar los que ya no tiene y agregar nuevos
      try {
        // Actualizar alojamiento
        await axios.put(
          `${fetchUrl}/alojamiento/putAlojamiento/${id}`,
          dataForm
        );

        // Obtener servicios asociados inicialmente
        const initialSelectedServices = await axios
          .get(`${fetchUrl}/alojamientosServicios/getAlojamientoServicio/${id}`)
          .then((res) => res.data);

        // Guardar los idAlojamientoServicios
        const initialServiceIds = initialSelectedServices.map(
          (service) => service.idAlojamientoServicio
        );

        // Encontrar los servicios que se han desmarcado (eliminar)
        const servicesToDelete = initialSelectedServices.filter(
          (service) => !selectedServices.includes(service.idServicio)
        );

        // Encontrar los nuevos servicios que se han marcado (agregar)
        const servicesToAdd = selectedServices.filter(
          (serviceId) => !initialServiceIds.includes(serviceId)
        );

        // Eliminar las asociaciones de servicios desmarcados (por idAlojamientoServicio)
        const deleteRequests = servicesToDelete.map((service) =>
          axios.delete(
            `${fetchUrl}/alojamientosServicios/deleteAlojamientoServicio/${service.idAlojamientoServicio}`
          )
        );

        // Crear nuevas asociaciones de servicios marcados (post)
        const addRequests = servicesToAdd.map((idServicio) => {
          const servicioSeleccionado = {
            idAlojamiento: parseInt(id),
            idServicio: parseInt(idServicio),
          };
          return axios.post(
            `${fetchUrl}/alojamientosServicios/createAlojamientoServicio`,
            servicioSeleccionado
          );
        });

        // Esperar a que todas las solicitudes se completen porque el backend
        // no esta preparado para recibir multipls inserciones concurrentes
        await Promise.all([...deleteRequests, ...addRequests]);

        setModalMessage(`Alojamiento y servicios actualizados con éxito`);
        setModal(true);
        clearForm();
      } catch (error) {
        setModalMessage(
          `Ocurrió un error al actualizar el alojamiento y servicios`
        );
        setModal(true);
        console.error("Hubo un error al realizar la solicitud PUT:", error);
      }
    } else {
      //CASO ELSE hace el post de un Alojamiento NUEVO

      // Validar formulario antes de enviar solo si no hay un ID
      if (!validateForm()) {
        setModal(true);
        setModalMessage("Por favor complete todos los campos correctamente.");
        return;
      }

      try {
        const res = await axios.post(
          `${fetchUrl}/alojamiento/createAlojamiento`,
          dataForm
        );

        // El ID del alojamiento se devuelve en la respuesta
        const alojamientoId = res.data.id;

        // Crear servicios asociados (iterando, para crear la estructura de cada uno
        // y su post individual, ya que el backend no tiene manejo de promesas multiples)
        const requests = selectedServices.map((idServicio) => {
          const servicioSeleccionado = {
            idAlojamiento: parseInt(alojamientoId),
            idServicio: parseInt(idServicio),
          };

          return axios.post(
            `${fetchUrl}/alojamientosServicios/createAlojamientoServicio`,
            servicioSeleccionado
          );
        });

        await Promise.all(requests);

        setModalMessage(`Alojamiento y servicios creados con éxito`);
        setModal(true);
        clearForm();
      } catch (error) {
        setModalMessage(`Ocurrió un error al crear el alojamiento y servicios`);
        setModal(true);
        console.error("Hubo un error:", error);
      }
    }
  };

  return (
    <main className="m-y crud-form">
      <h2 className="section-title">
        {id ? "Actualizar" : "Agregar"} Alojamiento
      </h2>
      <form onSubmit={handleSubmit} className="service-checkboxes">
        <div className="form-group">
          <label htmlFor="Titulo">Titulo</label>
          <input
            name="Titulo"
            type="text"
            value={dataForm.Titulo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Descripcion">Descripción</label>
          <input
            name="Descripcion"
            type="text"
            value={dataForm.Descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idTipoAlojamiento">Tipo de alojamiento:</label>
          <select
            name="idTipoAlojamiento"
            value={dataForm.idTipoAlojamiento || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione un tipo
            </option>
            {types.map((type) => (
              <option
                key={type.idTipoAlojamiento}
                value={type.idTipoAlojamiento}
              >
                {type.Descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Latitud">Latitud</label>
          <input
            name="Latitud"
            type="number"
            value={dataForm.Latitud}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Longitud">Longitud</label>
          <input
            name="Longitud"
            type="number"
            value={dataForm.Longitud}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="PrecioPorDia">Precio por día</label>
          <input
            name="PrecioPorDia"
            type="number"
            value={dataForm.PrecioPorDia}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CantidadDormitorios">Cantidad de dormitorios</label>
          <input
            name="CantidadDormitorios"
            type="number"
            value={dataForm.CantidadDormitorios}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CantidadBanios">Cantidad de baños</label>
          <input
            name="CantidadBanios"
            type="number"
            value={dataForm.CantidadBanios}
            onChange={handleChange}
            min={"0"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Estado">Estado:</label>
          <select
            name="Estado"
            value={dataForm.Estado}
            onChange={handleChange}
            required
          >
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>

        {/* Añadir sección para seleccionar servicios */}
        {/* <div className="form-group">
          <label htmlFor="Servicios">Servicios:</label>
          {services.map((service) => (
            <div key={service.idServicio}>
              <label>{service.Nombre}</label>
              <input
                type="checkbox"
                value={service.idServicio}
                checked={selectedServices.includes(service.idServicio)}
                onChange={handleServiceChange}
              />
            </div>
          ))}
        </div> */}

        <h2 className="title-secondary">
          Selecciona los servicios para este alojamiento:
        </h2>
        <div className="checkbox-container">
          {services.length &&
            services.map((service) => (
              <div key={service.idServicio} className="checkbox-group">
                <label htmlFor={`servicio-${service.idServicio}`}>
                  {service.Nombre}
                </label>
                <input
                  type="checkbox"
                  id={`servicio-${service.idServicio}`}
                  value={service.idServicio}
                  checked={selectedServices.includes(service.idServicio)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
        </div>

        <Link to="/administrar" className="btn cancel-button">
          Volver
        </Link>
        <button className="btn accent-button" type="submit">
          {id ? "Actualizar" : "Agregar"}
        </button>
      </form>
      {modal && (
        <Modal>
          {modalMessage}
          <Link to="/administrar" className="btn secondary-button">
            Volver
          </Link>
        </Modal>
      )}
    </main>
  );
};

export default FormAccommodation;
