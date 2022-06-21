import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Layout, Modal, Button, Card, Dropdown, Menu, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SubmitMethod from './SubmitMethod'
import TestSlider from '../methodmaker/ArtifactSlider';
import HypoSlider from '../methodmaker/HypoSlider';
import { Link } from "react-router-dom"

const DraftMethods = (props) => {

    return (
        <div>
        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
        <h3>Method title: {props.title} </h3>
          <SubmitMethod obsid={props.obsid} />
          <br></br>
          <TestSlider 
            obsid={props.obsid} 
            />
          <HypoSlider 
            obsid={props.obsid} 
            />
        </Card>
        </div>
      );
    };

export default DraftMethods;