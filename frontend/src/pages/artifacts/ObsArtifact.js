import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import "./ObsArtifact.css"

function ObsArtifact(props) {
    const { Meta } = Card;
    const [getobs, setGetobs] = useState({
        "created_at" : "", "email_obs" : "", "observation" : "", "id" : ""
    });

    const fetchObs = async () => { 
        const response = await axios.get(`http://127.0.0.1:5000/observations/${props.obsid}`)
        console.log(response, "this is resobs time");  

        const datas = response.data
        setGetobs(datas.observation);
        console.log(datas.data.observations, "this is obs time");  

    };
    useEffect(() => {
        fetchObs(); 
      }, [])

    return (
        
        <div className="obs_section">
            <div className="obs_artifact">
            <Card bordered={false} bodyStyle={{ padding: "5px"}}>
            <Meta
                avatar={<Link to={`/users/${getobs.email_obs}`}>
                    <Avatar size={60}>
                    {getobs.email_obs}
                    </Avatar>
                    </Link>}

                title={getobs.created_at}
            />
                <h3 key={getobs.id}>
                    { (getobs.observation).length < 225?
                    (getobs.observation)
                    :
                    ((getobs.observation).substring(0, 225) + '...')
                    }
                </h3>
            </Card>
            </div>
        </div>
        
  )
};

export default ObsArtifact;
