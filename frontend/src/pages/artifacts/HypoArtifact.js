import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import "./HypoArtifact.css"

function HypoArtifact(props) {
    const { Meta } = Card;
    const [gethypo, setGethypo] = useState({
        "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""
    });

    const fetchHypo = async (hypoid) => { 
        //console.log(hypoid);
        const data = await axios.get(`http://18.189.1.180:5000/hypo/${props.hypoid}`)
        const { hypo } = data.data
        //console.log(hypo);
        setGethypo(hypo);
    };

    useEffect(() => {
        fetchHypo(); 
      }, [])

    return (
        
        <div className="artifact_section">
            <div className="hypo_artifact">
            <Card bordered={false}>
            <Meta
                avatar={<Avatar size={60}>{gethypo.email_hypos}</Avatar>}
                title={gethypo.created_at}
            />
                <h3 key={gethypo.id}>
                    {gethypo.hypos}  
                </h3>
            </Card>
            </div>
        </div>
        
  )
};

export default HypoArtifact;
