import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({ baseURL: "http://localhost:4000" });

export default API;
