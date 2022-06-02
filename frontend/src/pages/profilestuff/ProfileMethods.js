import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import "./MethodFeed.css"
//import DataArtifact from '..//artifacts/DataArtifact';
import MethodData from '../artifacts/MethodData';
import HypoArtifact from '..//artifacts/HypoArtifact';


const ProfileMethods = (props) => {

    const { Meta } = Card;
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
      };
    const [methods, setMethods] = useState([]);

    const fetchMethods = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/method/${props.method_user}`);
        //console.log(response.data.methods);
        //console.log("lookie here guy");
        //const { posts } = data.data
        setMethods(response.data.methods);
    }
    useEffect(() => {
        fetchMethods(); 
      }, [])
    return (
        <div> 

            { (methods).map((method) => {
                return (
                <div>
                <Card style={{ height: 505, width: 1300  }} bodyStyle={{ padding: "10px"}}>
                <Meta
                    avatar={<Avatar size={69}  bodyStyle={{ padding: "10px"}}>{method.email_method}</Avatar>}

                    title={
                        <div>
                        <h2>{method.title}</h2>
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

export default ProfileMethods
