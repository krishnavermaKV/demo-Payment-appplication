import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Sendmoney } from './pages/Sendmoney'
import { Navigate } from 'react-router-dom'

function App() {
   
  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/sendmoney" element={<Sendmoney />}/>
    </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
