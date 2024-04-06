import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./i18n.jsx";
import { StrictMode } from "react";
import "main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
