import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api", // ✅ proxy path
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  let token = Cookies.get("XSRF-TOKEN");

  if (!token) {
    try {
      await axios.get("/api/sanctum/csrf-cookie", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      token = Cookies.get("XSRF-TOKEN");
    } catch (err) {
      console.error("❌ Failed to fetch CSRF cookie:", err);
    }
  }

  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

export default api;
