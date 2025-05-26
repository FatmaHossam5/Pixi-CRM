
import { createContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18next from 'i18next';

export const ToastContext = createContext();

export default function ToastContextProvider({ children }) {

  // Function to display a toast based on type (success/error) and message
  const showToast = (type, message) => {
    const isRTL = i18next.language === 'ar'; // Check if the current language is Arabic

    toast[type](message, {

      position: isRTL ? "top-left" : "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      rtl: isRTL,

    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
