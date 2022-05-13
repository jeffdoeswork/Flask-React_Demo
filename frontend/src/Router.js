import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/methodmaker/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/userstuff/LoginPage';
import UserDashboard from './pages/profilestuff/UserDashboard';
import RegisterPage from './pages/userstuff/RegisterPage';
import Logout from './pages/userstuff/Logout';
import NewsFeed from './pages/newsfeed/NewsFeed';
//I do not use react-router-dom 'links' or 'switch' to handel routes. Only the style you see below
const Router = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/newsfeed"  element={<NewsFeed />}/>
            <Route path="/login"  element={<LoginPage />}/>
            <Route path="/register"  element={<RegisterPage />}/>
            <Route path="*"  element={<NotFound />} />
            <Route path="/my_account" element={<UserDashboard />}/>
            <Route path="/logout"  element={<Logout />}/>
          </Routes>
        </BrowserRouter>
  )
}

export default Router