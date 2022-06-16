import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Layout, Modal, Button, Card, Dropdown, Menu, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SubmitMethod from './SubmitMethod'
import TestSlider from '../methodmaker/ArtifactSlider';
import HypoSlider from '../methodmaker/HypoSlider';
import { Link } from "react-router-dom"

const DraftMethods = (props) => {
    //const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [methodtitlez, setMethodtitlez] = useState("");
    const [amethod, setAmethod] = useState([]);


    const getUserMethods = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/method/${props.obsid}/title/${props.email}`)
        if (data.data.items.length < 1) {
            const email_method = props.email
            const date = new Date().getDate();
            const month = new Date().getMonth();
            const min = new Date().getMinutes();
            const sec = new Date().getSeconds();
            const title =  email_method + " draft-" + props.obsid.toString() + " " + date + month + min + sec
            const observation = props.obsid
            const dataz = await axios.post(`http://127.0.0.1:5000/methods/draft`, {email_method, title, observation})
            const data = await axios.get(`http://127.0.0.1:5000/method/${props.obsid}/title/${props.email}`)
            setOptions(data.data.items);
        }
        setOptions(data.data.items);
        }

    useEffect(() => {
    getUserMethods(); 
    }, [])

    const onClick = async ({ key }) => {
        const data = await axios.get(`http://127.0.0.1:5000/method/title/${key}`)
        const dataz = await axios.get(`http://127.0.0.1:5000/method/a/${key}`)
        setMethodtitlez(data.data.title.title);
        setAmethod(dataz.data.method)
        //console.log("new title title", data.data.title.title);
      };
      
    //const menu =  <Menu items = {(options)} />
    const menuz =  <Menu
      onClick={onClick}
      items={
          options.map(opt => {
              return(
                  //{"key" : opt["key"], "label" : <Link to={`/explore/${id}/${opt["key"]}`}>{opt["label"]}</Link>}
                  {"key" : opt["key"], "label" : opt["label"]}
                  //opt["key"],
                  //opt["label"]
              )
          })
        } />

    console.log("newnew, title, title, ", methodtitlez);
    return (
        <div>
        <Card bordered={false} bodyStyle={{ padding: "5px"}}>

        <Dropdown overlay={props.methodtitle > 0? props.menu : menuz}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
            Your Methods Are Here
                <DownOutlined />
            </Space>
            </a>
        </Dropdown>
        <h2>{props.email}'s' {props.title?  props.title : methodtitlez}</h2>
          <SubmitMethod obsid={props.obsid} />
          <br></br>
          <TestSlider obsid={props.obsid} method={props.method.data? props.method.data : amethod.data}/>
          <HypoSlider obsid={props.obsid} method={props.method.hypo? props.method.hypo : amethod.hypo}/>
        </Card>
        </div>
      );
    };

export default DraftMethods;