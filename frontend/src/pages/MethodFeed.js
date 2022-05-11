import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import "./MethodFeed.css"

const MethodFeed = () => {
    const { Meta } = Card;
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
      };
    const [email, setEmail] = useState({
        email : ""
      });
    const [methods, setMethods] = useState([]);
    const [gethypo, setGethypo] = useState({
        "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""
    });
    const [getdata, setGetdata] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });

    const fetchData = async (dataid) => { 
        const response = await axios.get(`http://127.0.0.1:5000/data/${dataid}`)
        console.log(response);  
        const datas = response.data
        setGetdata(datas.data);
    };
    const fetchHypo = async (hypoid) => { 
        //console.log(hypoid);
        const data = await axios.get(`http://127.0.0.1:5000/hypo/${hypoid}`)
        const { hypo } = data.data
        //console.log(hypo);
        setGethypo(hypo);
    };
    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        setEmail(data.data);
    }
    const fetchMethods = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/method`);
        console.log(response.data.methods);
        console.log("lookie here guy");
        //const { posts } = data.data
        setMethods(response.data.methods);
    

    }
    useEffect(() => {
        getUser(); 
        fetchMethods(); 
      }, [])
    return (
        <div className="center_method"> 

            { (methods).map((method) => {
                return (
                <div>
                <Card  style={{ width: 900 }}>
                <Meta
                    avatar={<Avatar size={40}>{method.email_method}</Avatar>}
                    title={method.title}
                />
                <br></br>
                <div className="center_artifacts">
                    <div className='data_testslider_border'>
                        {method.data}
                    </div>
                    <br></br>

                    <div className='hypo_testslider_border'>
                        {method.hypo}
                    </div>
                </div>
                </Card>
                </div>
                )
            }) 
            }
        </div>
        )
}

export default MethodFeed
