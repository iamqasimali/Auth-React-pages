import axios from "axios";
// Get the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance to manage default configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle API calls (e.g., GET, PUT, POST, etc.)
const httpService = async (method, url, token, data = null) => {
  try {
    const config = {
      headers: {
        Authorization: token ? token : "", // Authorization header with Bearer token
      },
      params: method === "GET" ? data : null, // For GET request, data will be sent as query params
      data: method === "POST" || method === "PATCH" ? data : null, // For POST and PATCH, add body data
    };

    // Make the API request
    const response = await axiosInstance.request({
      method,
      url,
      ...config, // Spread the config with the correct parameters and data
    });

    return response; // Return the response data (API response)
  } catch (err) {
    // Error handling with detailed return
    const errorResponse = {
      message:
        err.response?.data?.message || err.message || "An error occurred",
      status: err.response?.status || 500,
      data: err.response?.data || null,
    };

    console.error("API error:", errorResponse); // Optionally log the error in the console
    return errorResponse; // Return a structured error response
  }
};

export default httpService;

