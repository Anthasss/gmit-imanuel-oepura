import axios from "axios";

// Create an Axios instance with default configs
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
