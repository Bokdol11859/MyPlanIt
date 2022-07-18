import axios from "axios";

const baseURL =
  process.env.REACT_APP_BACKEND_API_BASE_URI || "http://localhost:8000";

const client = axios.create({
  baseURL,
});

export default client;
