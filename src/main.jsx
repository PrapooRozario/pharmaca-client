import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Router from "./routers/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  </StrictMode>
);
