import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import RegisterPage from './pages/RegisterPage';
import useToken from './useToken';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />
            <Route path="/test"  element={<Test />} />
            <Route path="*"  element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
