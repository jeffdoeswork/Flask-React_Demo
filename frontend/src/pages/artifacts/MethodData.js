import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import "./DataArtifact.css"
import { Link } from "react-router-dom";

function MethodData(props) {
    const { Meta } = Card;
    //const [getdata, setGetdata] = useState({"created_at" : "", "email_datas" : "", "datas" : "", "id" : ""});
    const [getdataone, setGetdataone] = useState([]);
    const [getdatatwo, setGetdatatwo] = useState([]);
    const [getdatathree, setGetdatathree] = useState([]);

    const fetchData = async () => { 
        const response = await axios.get(`http://127.0.0.1:5000/methoddatas/datas/${props.methodid}`)
        const datas = response.data.datalist
        console.log("these are the datas assoicated with the method", datas.data)
        //setGetdata(datas.data);
        if (datas.length == 1) {
            setGetdataone(datas[0]);
        } else if (datas.length == 2) {
            setGetdataone(datas[0]);
            setGetdatatwo(datas[1]); 
        } else if (datas.length == 3) {
            setGetdataone(datas[0]);
            setGetdatatwo(datas[1]);   
            setGetdatathree(datas[2]); 
        }
        };

    useEffect(() => {
        fetchData();
      }, [])

    return (
        
        <Card bordered={false}>
        <Row>
            { getdataone.id? 
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