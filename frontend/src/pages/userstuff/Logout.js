import React, { useEffect } from 'react';
import axios from 'axios';

// This doen't work at all! Oh well
const LandingPage = () => {
    const logoutUser = data => {
      return axios.get(`http://127.0.0.1:5000/logout`, { withCredentials: true })
        
    }

    useEffect(() => {
      logoutUser(); 
      logoutUser(); 

      logoutUser(); 

        }, 2500)

    useEffect(() => {
      window.location.href = "/";
      }, [])

  return (
    <div>
        <h2>Thank you for testing out Socialtific!</h2>
    </div>
  );
};

export default LandingPage;