# IDW proyecto integrador - Entrega Final

## Integrantes:
- Aquino, María Carla
- Gauthier, Gustavo
- Romero, Ana Belén
- Strugo, Florencia

[Enlace al video explicativo de youtube](https://www.youtube.com/watch?v=XXfkmKb3-wc&t=3s&ab_channel=FlorenciaStrugo)

## Introducción
Esta es la entrega final del Trabajo Práctico de Introducción al Desarrollo Web sobre alojamientos.
Luego de haber definido el estilo visual y maquetar el sitio en html y css en la primera entrega, nos 
encargamos de transformarlo en un proyecto de react que hacía uso de un JSON temporal para mostrar las 
páginas de navegación y detalles de los alojamientos. Además, en esa segunda entrega también sumamos un 
CRUD para los tipos de alojamientos.
En esta entrega final se incorporaron cruds para las demas tablas de la api, se adaptó el sitio para que
sea responsive implementando medias querys y también se incorporaron filtros de búsqueda, tanto para el 
home como para la tabla de alojamientos en el administrador

## ACLARACIONES IMPORTANTES SOBRE NUESTRO PROYECTO
Luego de plantear una problemática y pedir permiso para modificar en la clase del 18/06/2024, como grupo 
resolvimos hacer 2 modificaciones en el backend, puntualmente hablando, del controlador de obtener los 
servicios de un alojamiento por su id. El backend con las modificaciones se encuentra en este mismo repositorio.
A continuación, detallamos el controlador y las modificaciones:

```
exports.getAlojamientoServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await dbConnection.getConnection();
    const [rows] = await connection.query("SELECT * FROM alojamientoservicios WHERE idAlojamiento = ?", [id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el alojamientoservicio" });
  }
};
```

**Modificacion del WHERE:** `idAlojamientoServicio a idAlojamiento`
**Modificacion de la respuesta:** `rows[0] a rows`


## Como correr nuestro proyecto:

En en una terminal posicionada en la carpeta backend correr los comandos `npm install` para instalar todas las dependencias y luego `npm run dev`

En otra terminal posicionada en la carpeta frontend correr los comandos `npm install` para instalar todas las dependencias y luego `npm run start`
