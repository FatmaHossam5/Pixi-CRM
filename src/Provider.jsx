import React from 'react'
import { AuthProvider } from './Components/Helpers/Context/AuthContext'
import { ThemeProvider } from './Components/Helpers/Context/ThemeContext'
import ModalContextProvider from './Components/Helpers/Context/ModalContext'
import ToastContextProvider from './Components/Helpers/Context/ToastContext '

export default function AppProviders({children}) {
  return (
   <AuthProvider>
    <ThemeProvider>
        <ModalContextProvider>
            <ToastContextProvider>
                {children}
            </ToastContextProvider>
        </ModalContextProvider>
    </ThemeProvider>
   </AuthProvider>
  )
}
