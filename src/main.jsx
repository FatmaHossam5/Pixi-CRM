
import "bootstrap/dist/js/bootstrap.bundle.js";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ToastContextProvider from "./Components/Helpers/Context/ToastContext .jsx";
import './i18n.js'; // Import i18n configuration

import { AuthProvider } from "./Components/Helpers/Context/AuthContext.jsx";
import ModalContextProvider from "./Components/Helpers/Context/ModalContext.jsx";
import { ThemeProvider } from "./Components/Helpers/Context/ThemeContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider >
    <ThemeProvider>

      <ModalContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </ModalContextProvider>
    </ThemeProvider>

  </AuthProvider >

);
