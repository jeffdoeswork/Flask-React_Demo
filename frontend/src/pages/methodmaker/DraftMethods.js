import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Row, Col, Layout, Modal, Button, Card, Dropdown, Menu, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SubmitMethod from './SubmitMethod'
import TestSlider from '../methodmaker/ArtifactSlider';
import HypoSlider from '../methodmaker/HypoSlider';
import { Link } from "react-router-dom"

const DraftMethods = (props) => {

    return (
        <div>
        
        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
        <Row>
            <Col span={2}></Col>
            <Col span={8}><h1>Method title: {props.method.title} </h1></Col>
        </Row>
          <SubmitMethod 
            obsid={props.obsid}
            method={props.method}
           />
          <br></br>
          <br></br>
          <TestSlider 
            obsid={props.obsid} 
            method={props.method}
            />
          <HypoSlider 
            obsid={props.obsid} 
            method={props.method}
            />
        </Card>
        </div>
      );
    };

export default DraftMethods;