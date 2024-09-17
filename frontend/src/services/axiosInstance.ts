import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // Set base URL
  timeout: 10000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token (if available)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., token expiration, server errors)
    if (error.response.status === 401) {
      // Optionally, you could log the user out or refresh the token
      console.error("Unauthorized - Token expired");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
