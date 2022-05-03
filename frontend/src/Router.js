import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Test from './pages/Test';
import RegisterPage from './pages/RegisterPage';
import Logout from './pages/Logout';
import ArtifactFeed from './pages/ArtifactFeed';

const Router = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/newsfeed"  element={<ArtifactFeed />}/>
            <Route path="/login"  element={<LoginPage />}/>
            <Route path="/register"  element={<RegisterPage />}/>
            <Route path="*"  element={<NotFound />} />
            <Route path="/my_account" element={<Test />}/>
            <Route path="/logout"  element={<Logout />}/>
          </Routes>
        </BrowserRouter>
  )
}

export default Router