import axios from "axios";

class SpecimenService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
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

  // POST /api/specimens
  createSpecimen = (requestBody) => {
    return this.api.post("/api/specimens", requestBody);
  };
}

const specimenService = new SpecimenService();

export default specimenService;