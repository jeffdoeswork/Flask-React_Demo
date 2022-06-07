import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import "./ObsArtifact.css"

function ObsArtifact(props) {
    const { Meta } = Card;
    const [getdata, setGetdata] = useState({
        "created_at" : "", "email_obs" : "", "observation" : "", "id" : ""
    });

    const fetchObs = async () => { 
        const response = await axios.get(`http://127.0.0.1:5000/observations/${props.obsid}`)
        const datas = response.data
        setGetdata(datas.data);
        console.log(datas.data);  

    };
    useEffect(() => {
        fetchObs(); 
      }, [])

    return (
        
        <div className="obs_section">
            <div className="obs_artifact">
            <Card bordered={false} bodyStyle={{ padding: "5px"}}>
            <Meta
                avatar={<Link to={`/users/${getdata.email_obs}`}>
                    <Avatar size={60}>
                    {getdata.email_obs}
                    </Avatar>
                    </Link>}

                title={getdata.created_at}
            />
                <h3 key={getdata.id}>
                    { (getdata.observation).length < 225?
                    (getdata.observation)
                    :
                    ((getdata.observation).substring(0, 225) + '...')
                    }
                </h3>
            </Card>
            </div>
        </div>
        
  )
};

export default ObsArtifact;
