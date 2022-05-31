import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
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
        console.log(datas.data);  

    };
    useEffect(() => {
        fetchData(); 
      }, [])

    return (
        
        <div className="artifact_section">
            <div className="data_artifact">
            <Card bordered={false}>
            <Meta
                avatar={<Avatar size={60}>{getdata.email_datas}</Avatar>}
                title={getdata.created_at}
            />
                <h3 key={getdata.id}>
                    {getdata.datas}  
                </h3>
            </Card>
            </div>
        </div>
        
  )
};

export default DataArtifact;
