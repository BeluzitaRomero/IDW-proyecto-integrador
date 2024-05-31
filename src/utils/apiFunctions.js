import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al recuperar los datos:", error);
    return null;
  }
};
