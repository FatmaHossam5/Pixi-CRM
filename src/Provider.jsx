import React from 'react'
import { AuthProvider } from './context/admin/AuthContext'
import { ThemeProvider } from './context/shared/ThemeContext'
import ModalContextProvider from './context/shared/ModalContext'
import ToastContextProvider from './context/shared/ToastContext '

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
