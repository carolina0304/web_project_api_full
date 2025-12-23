import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const token = jwt.sign(
  { _id: user._id }, // payload con solo el _id
  process.env.JWT_SECRET || "tu-clave-secreta", // clave secreta desde .env
  { expiresIn: "7d" } // expira en 7 días (una semana)
);
