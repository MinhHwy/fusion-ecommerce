import axios from "axios";

const api = axios.create({
  baseURL: "https://fusion-ecommerce.onrender.com",
  withCredentials: true
});

export default api;

