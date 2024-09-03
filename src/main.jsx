import { StrictMode, React } from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProviderWrapper } from "./context/theme.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </StrictMode>
);
