import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  if (["post", "put", "delete"].includes(config.method?.toLowerCase() || "")) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN"))
      ?.split("=")[1];

    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }
  }

  return config;
});

export default API;
