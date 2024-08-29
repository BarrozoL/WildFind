import { StrictMode, React } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProviderWrapper } from "./context/auth.context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </StrictMode>
);
