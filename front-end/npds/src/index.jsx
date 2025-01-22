import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ColorProvider } from "./ColorContext";
import App from "./App";
import './styles/style.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ColorProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ColorProvider>
);