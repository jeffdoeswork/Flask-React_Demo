import React, { useState, useEffect } from 'react'
import ArtifactFeed from './pages/ArtifactFeed';
import MethodFeed from './pages/MethodFeed';
import axios from 'axios';
import { Button } from "antd";
import "./pages/MethodFeed.css" 

const NewsFeed = () => {
    const [email, setEmail] = useState({
        email : ""
        });
    const [toggle, setToggle] = useState(false);

    //gets current email from api
    const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        setEmail(data.data);
        }
    function toggler() {
        if (toggle) {
          setToggle(false)
        } else {
          setToggle(true)
        }
      }
 
    useEffect(() => {
        getUser(); 
      }, [])

    if (email.email) { 
    return (
        <div>
            <div className='center'>
                { toggle ?
                    <Button size="large" type="primary" onClick={() => toggler()}>Method Feed</Button>
                    :
                    <Button size="large" type="primary" onClick={() => toggler()}>Artifact Feed</Button>
                }
            </div>
            <br></br>
            { toggle ? 
                <MethodFeed />
                :
                <ArtifactFeed />
        }
            
        </div>
    ) } else {
        return (
            <div>
            <h2> You should Probably login</h2>
            </div>
        );
    }
}

export default NewsFeed
