import { createRoot } from "react-dom/client";
import { Router as WouterRouter } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <App />
    </WouterRouter>
  </HelmetProvider>
);
