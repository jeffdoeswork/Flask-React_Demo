import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import "./MethodFeed.css"
import DataArtifact from '..//artifacts/DataArtifact';
import HypoArtifact from '..//artifacts/HypoArtifact';

const MethodFeed = () => {
    const { Meta } = Card;
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
      };
    const [email, setEmail] = useState({
        email : ""
      });
    const [methods, setMethods] = useState([]);

    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        setEmail(data.data);
    }
    const fetchMethods = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/method`);
        //console.log(response.data.methods);
        //console.log("lookie here guy");
        //const { posts } = data.data
        setMethods(response.data.methods);
    }
    useEffect(() => {
        getUser(); 
        fetchMethods(); 
      }, [])
    return (
        <div className="center_method"> 

            { (methods).map((method) => {
                return (
                <div>
                <Card style={{ height: 490 }}>
                <Meta
                    avatar={<Avatar size={80}>{method.email_method}</Avatar>}
                    title={
                    <div>
                        <h2>{method.title} </h2>
                        <h3>{method.created_at}</h3>
                    </div>
                    }
                />
                <br></br>
                <div className="center_artifacts">
                        <DataArtifact dataid={method.data} />
                        <br></br>
                        <br></br>
                        <HypoArtifact hypoid={method.hypo} />
                </div>
                </Card>
                </div>
                )
            }) 
            }
        </div>
        )
}

export default MethodFeed
