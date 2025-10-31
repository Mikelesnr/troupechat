import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  let token = Cookies.get("XSRF-TOKEN");

  if (!token) {
    try {
      await axios.get(`${API_BASE}/sanctum/csrf-cookie`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      token = Cookies.get("XSRF-TOKEN");
      console.log(`✅ Fetched CSRF token: ${token}`);
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
