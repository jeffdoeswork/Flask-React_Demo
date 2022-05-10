import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MethodFeed = () => {
    const [email, setEmail] = useState({
        email : ""
      });
    const [methods, setMethods] = useState({
        title : "",
        email_method : "",
        hypo : "",
        data : "",
        created_at : ""
      });

    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        setEmail(data.data);
    }
    const fetchMethods = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/method`);
        console.log(response);
        //const { posts } = data.data
        setMethods(response.data);
    }
    useEffect(() => {
        getUser(); 
        fetchMethods(); 
      }, [])
    return (
        <div>
            <h1>Method Feed</h1>
        </div>
        )
}

export default MethodFeed
