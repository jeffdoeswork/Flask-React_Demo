import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import "./MethodFeed.css"
import MethodData from '..//artifacts/MethodData';
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
        <div> 

            { (methods).map((method) => {
                return (
                <div>
                <Card style={{ height: 505, width: 1300 }} bodyStyle={{ padding: "10px"}}    >
                <Meta
                    avatar={<Avatar size={69}  bodyStyle={{ padding: "10px"}}>{method.email_method}</Avatar>}
                    title={
                    <div>
                        <h2>{method.title} </h2>
                        <h3>{method.created_at}</h3>
                    </div>
                    }
                />
                <div className="center_artifacts">
                        <MethodData dataarray={method.data} />
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
