import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Layout, Modal, Button, Card, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SubmitMethod from './SubmitMethod'
import TestSlider from '../methodmaker/ArtifactSlider';
import HypoSlider from '../methodmaker/HypoSlider';
import {  } from 'antd';

const DraftMethods = (props) => {
    //const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const getUserMethods = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/method/${props.obsid}/title/${props.email}`)
        if (data.data.items.length < 1) {
            console.log('You have no method!')
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
        console.log(data.data.items);
        }

    const handleChange = (event) => {
    //setValue(event.target.value);
    };

    useEffect(() => {
    getUserMethods(); 
    }, [])
    const menu =  <Menu items = {(options)} />

    return (
        <div>
         <Card bordered={false} bodyStyle={{ padding: "5px"}}>
         <Dropdown overlay={props.menu.length >= 1? props.menu : menu}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                Your Methods Are Here
                <DownOutlined />
            </Space>
            </a>
        </Dropdown>

          <SubmitMethod obsid={props.obsid}/>
          <br></br>
          <TestSlider obsid={props.obsid}/>
          <HypoSlider obsid={props.obsid}/>
        </Card>
        </div>
      );
    };

export default DraftMethods;