import axios from "axios";

class SightingService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/sightings
  createSighting = (requestBody) => {
    return this.api.post("/api/sightings", requestBody);
  };

  uploadImage = (file) => {
    return this.api.post("/api/upload", file);
  };
}

const sightingService = new SightingService();

export default sightingService;
