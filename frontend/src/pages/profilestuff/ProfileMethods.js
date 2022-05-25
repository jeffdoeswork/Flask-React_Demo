import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import "./MethodFeed.css"
import DataArtifact from '..//artifacts/DataArtifact';
import HypoArtifact from '..//artifacts/HypoArtifact';

const ProfileMethods = (props) => {

    const { Meta } = Card;
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
      };
    const [methods, setMethods] = useState([]);

    const fetchMethods = async () => {
        const response = await axios.get(`http://18.189.1.180:5000/method/${props.method_user}`);
        //console.log(response.data.methods);
        //console.log("lookie here guy");
        //const { posts } = data.data
        setMethods(response.data.methods);
    }
    useEffect(() => {
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
                    title={<h2>{method.title}</h2>}
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

export default ProfileMethods
