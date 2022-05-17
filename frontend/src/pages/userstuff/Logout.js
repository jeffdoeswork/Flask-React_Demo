import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// This doen't work at all! Oh well
const LandingPage = () => {
  const navigate = useNavigate("/");

    const logoutUser = data => {
      navigate();
      return axios.get(`http://127.0.0.1:5000/logout`, { withCredentials: true })
        
    }
        
    /*useEffect(() => {
        logoutUser(); 
        window.location.href = "/";
        }, [])*/

  return (
    <div>
        <h2>Thank you for testing out Socialtific!</h2>
    </div>
  );
};

export default LandingPage;