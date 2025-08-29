import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
    timeout: 10000
});

// ✅ Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Example: Add token if available
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
            return Promise.reject(error);
        }
);

// ✅ Response Interceptor
api.interceptors.response.use(
    (response) => {
            return response.data; // Return only data for convenience
        },
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data?.message || error.message);
            // Example: Handle unauthorized
            if (error.response.status === 401) {
            // Optionally redirect to login
                window.location.href = "/login";
            }
        } else if (error.request) {
            console.error("No response received from server.");
        } else {
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);
