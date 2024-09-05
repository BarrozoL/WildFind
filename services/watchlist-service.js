import axios from "axios";

class WatchService {
  constructor() {
    this.api = axios.create({
      baseURL:
        import.meta.env.SERVER_URL || "https://wildfindserver.adaptable.app/",
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

  //POST watch to user
  createWatch = (userId, requestBody) => {
    return this.api.post(`/api/watchlist/${userId}`, requestBody);
  };
}

/* 
  // POST /api/sightings
  createWatch = (requestBody) => {
    return this.api.post("/api/watchlist", requestBody);
  }
 */

const watchService = new WatchService();

export default watchService;
