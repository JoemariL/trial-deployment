import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.useCredentials = true;

const API = axios.create({
  baseURL: "https://slu-triage-app.herokuapp.com",
  withCredentials: true,
  credentials: "include",
});

export default API;
