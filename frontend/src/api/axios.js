import axios from "axios";

const api = axios.create({
  baseURL: "https://fusion-ecommerce.onrender.com/product",
  withCredentials: true
});

export default api;