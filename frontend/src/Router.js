import React from 'react'
import { Route } from 'react-router-dom';
import { BrowserRouter, Routes } from "react-router-dom"
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import useToken from './useToken';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/test"  element={<Test />} />
            <Route path="*"  element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
