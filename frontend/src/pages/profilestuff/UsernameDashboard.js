import React, { useState, useEffect } from 'react'
import ProfileArtifacts from './ProfileFeed'
import ProfileMethods from './ProfileMethods'
import axios from 'axios';
import { Button } from "antd";
import "./MethodFeed.css" 
import { useParams } from 'react-router-dom'

function UsernameDashboard() {
    const {id} = useParams();
    const [email, setEmail] = useState({
        email : ""
        });
    const [toggle, setToggle] = useState(false);
    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
            setEmail(data.data);
            }
    function toggler() {
        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }}
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
                       <ProfileArtifacts user={id} />
                        :
                        <ProfileMethods method_user={id} />
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

export default UsernameDashboard;
