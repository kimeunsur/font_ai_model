import React from "react";
import ReactDOM from "react-dom/client";
import StartPage from "./components/StartPage";
import "./styles/tailwind.css";

const App = () => {
  return <StartPage />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
