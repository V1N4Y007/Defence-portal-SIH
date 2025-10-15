import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/api"; // Initialize mock API service

createRoot(document.getElementById("root")!).render(<App />);
