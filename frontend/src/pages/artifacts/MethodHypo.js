import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import "./HypoArtifact.css"

function MethodHypo(props) {
    const { Meta } = Card;
    const [gethypo, setGethypo] = useState({
        "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""
    });
    const [hypowork, setHypowork] = useState(false)

    const fetchHypo = async () => { 
        //console.log(hypoid);
        const data = await axios.get(`http://127.0.0.1:5000/methodhypo/hypo/${props.hypoid}`)
        const hypo = data.data.methodhypo
        console.log(hypo);
        if (hypo.id) {
        setGethypo(hypo);
        } else {setHypowork(true)}
    };

    useEffect(() => {
        fetchHypo(); 
      }, [])

    return (
        <div> {hypowork.id? 
            <div></div>
            :
            <div className="artifact_section">
                <div className="hypo_artifact">
                <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                <Meta
                    avatar={
                    <Link to={`/users/${gethypo.email_hypos}`}>
                    <Avatar size={60}>{gethypo.email_hypos}</Avatar>
                    </Link>}
                    title={gethypo.created_at}
                />
                    <h3 key={gethypo.id}>
                    { (gethypo.hypos).length < 225?
                        (gethypo.hypos)
                        :
                        ((gethypo.hypos).substring(0, 225) + '...')
                        }
                    </h3>
                </Card>
                </div>
            </div>
                }
        </div>
  )
};

export default MethodHypo
