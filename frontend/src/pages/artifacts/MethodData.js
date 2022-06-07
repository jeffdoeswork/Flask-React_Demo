import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import "./DataArtifact.css"
import { Link } from "react-router-dom";

function MethodData(props) {
    const { Meta } = Card;
    const [getdata, setGetdata] = useState({"created_at" : "", "email_datas" : "", "datas" : "", "id" : ""});
    const [getdataone, setGetdataone] = useState({"created_at" : "", "email_datas" : "", "datas" : "", "id" : ""});
    const [getdatatwo, setGetdatatwo] = useState({"created_at" : "", "email_datas" : "", "datas" : "", "id" : ""});
    const [getdatathree, setGetdatathree] = useState({"created_at" : "", "email_datas" : "", "datas" : "", "id" : ""});

    const fetchData = async (dataid, i) => { 
        const response = await axios.get(`http://127.0.0.1:5000/data/${dataid}`)
        const datas = response.data
        if (i === 0) {
            setGetdataone(datas.data);
        } else if (i === 1 ) {
            setGetdatatwo(datas.data);
        } else if (i === 2 ) {
            setGetdatathree(datas.data);
        }
    };

    useEffect(() => {
        console.log(props.dataarray, "hey look at me lala");
        const prop = props.dataarray
        for(var i=0;i<prop.length;i++){
            console.log(prop[i], "lala method newfeed", i)
            fetchData(prop[i], i);
            }  
          
      }, [])

    return (
        
        <Card bordered={false}>
        <Row>
            { getdataone.id ? 
            <Col span={8}>
            <div className="artifact_section_smol">
                <div className="data_artifact_smol">
                <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                <Meta
                    avatar={
                    <Link to={`/users/${getdataone.email_datas}`}>
                    <Avatar size={50}>{getdataone.email_datas}</Avatar>
                    </Link>
                    }
                    title={getdataone.created_at}
                />
                    <h3 key={getdataone.id}>
                    { (getdataone.datas).length < 125?
                    (getdataone.datas)
                    :
                    ((getdataone.datas).substring(0, 125) + '...')
                    } 
                    </h3>
                </Card>
                </div>
            </div>
            </Col> : <div></div> }
            { getdatatwo.id ?
            <Col span={8}>
            <div className="artifact_section_smol">
                <div className="data_artifact_smol">
                <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                <Meta
                    avatar={
                    <Link to={`/users/${getdatatwo.email_datas}`}>
                    <Avatar size={50}>{getdatatwo.email_datas}</Avatar>
                    </Link>}
                    title={getdatatwo.created_at}
                />
                    <h3 key={getdatatwo.id}>
                    { (getdatatwo.datas).length < 125?
                    (getdatatwo.datas)
                    :
                    ((getdatatwo.datas).substring(0, 125) + '...')
                    }                    
                    </h3>
                </Card>
                </div>
            </div>
            </Col> : <div></div> }
            { getdatathree.id ? 
            <Col span={8}>
            <div className="artifact_section_smol">
                <div className="data_artifact_smol">
                <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                <Meta
                    avatar={<Link to={`/users/${getdatathree.email_datas}`}>
                    <Avatar size={50}>{getdatathree.email_datas}</Avatar>
                    </Link>}
                    title={getdatathree.created_at}
                />
                    <h3 key={getdatathree.id}>
                    { (getdatathree.datas).length < 125?
                    (getdatathree.datas)
                    :
                    ((getdatathree.datas).substring(0, 125) + '...')
                    } 
                    </h3>
                </Card>
                </div>
            </div>
            </Col> : <div></div> }
        </Row>
    </Card>
        
  )
};

export default MethodData;