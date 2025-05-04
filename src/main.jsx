
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './i18n.js'; // Import i18n configuration
import ToastContextProvider from "./Components/Helpers/Context/ToastContext .jsx";

import AuthContextProvider from "./Components/Helpers/Context/AuthContext.jsx";
import ModalContextProvider from "./Components/Helpers/Context/ModalContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  
    <AuthContextProvider>
      <ModalContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>

);
