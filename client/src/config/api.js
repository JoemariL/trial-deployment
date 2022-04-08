import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.useCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  credentials: "include",
});

export default API;
