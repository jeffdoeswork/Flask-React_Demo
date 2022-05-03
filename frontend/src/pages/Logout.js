import React, {useState, useEffect} from 'react';
import axios from 'axios';




const LandingPage = () => {

    const logoutUser = async () => {
        axios.post(`http://127.0.0.1:5000/logout`,{ withCredentials: true })
        axios.delete(`http://127.0.0.1:5000/logout`,{ withCredentials: true })
        window.location.href = "/";
        }

        
    useEffect(() => {
        logoutUser(); 
        }, [])

  return (
    <div>
        { logoutUser() }
    </div>
  );
};

export default LandingPage;