import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };

  requestPasswordReset = (email) => {
    return this.api.post("/auth/request-password-reset", { email });
  };

  // New method for resetting password
  resetPassword = (token, password) => {
    return this.api.post(`/auth/reset-password/${token}`, { password });
  };
}

// Create one instance object
const authService = new AuthService();

export default authService;
