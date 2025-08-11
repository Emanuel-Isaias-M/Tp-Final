import axios from "axios";

// Apunto Axios a mi base de MockAPI que puse en .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});
