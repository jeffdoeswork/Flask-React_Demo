import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import "./DataArtifact.css"

function DataArtifact(props) {
    const { Meta } = Card;
    const [getdata, setGetdata] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });

    const fetchData = async () => { 
        const response = await axios.get(`http://127.0.0.1:5000/data/${props.dataid}`)
        const datas = response.data
        setGetdata(datas.data);

    };
    useEffect(() => {
        fetchData(); 
      }, [])

    return (
        
        <div className="artifact_section">
            <div className="data_artifact">
            <Card bordered={false} bodyStyle={{ padding: "5px"}}>
            <Meta
                avatar={<Link to={`/users/${getdata.email_datas}`}>
                    <Avatar size={60}>
                    {getdata.email_datas}
                    </Avatar>
                    </Link>}

                title={getdata.created_at}
            />
                <h3 key={getdata.id}>
                    { (getdata.datas).length < 225?
                    (getdata.datas)
                    :
                    ((getdata.datas).substring(0, 225) + '...')
                    }
                </h3>
            </Card>
            </div>
        </div>
        
  )
};

export default DataArtifact;
