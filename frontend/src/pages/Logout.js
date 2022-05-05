import React, {useState, useEffect} from 'react';
import axios from 'axios';



// This doen't work at all! Oh well
const LandingPage = () => {

    const logoutUser = data => {
        return axios.post(`http://127.0.0.1:5000/logout`)

        window.location.href = "/";
    }
        
    useEffect(() => {
        logoutUser(); 
        }, [])

  return (
    <div>
        <h2> The logout function doesn't work, but the refresh cookies should expire when you leave the browser</h2>
        { logoutUser() }
    </div>
  );
};

export default LandingPage;