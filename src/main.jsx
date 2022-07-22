import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { LoginPage, SignUpPage, ForgotPasswordPage } from "./pages/";
import { AuthProvider } from './auth'
import './index.css'

function Main() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <RoutesWrapper />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

function RoutesWrapper() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
