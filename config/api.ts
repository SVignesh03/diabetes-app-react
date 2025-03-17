import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Optional: Add token if needed)
api.interceptors.request.use(
  async (config) => {
    // Example: Add Authorization token if using authentication
    // const token = await AsyncStorage.getItem("authToken");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Handles Errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
