import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';
import HypoSlider from './HypoSlider';
import { Layout, Menu, Modal, Button } from 'antd';
import SubmitMethod from './SubmitMethod'
//This landing page is acutally the Method Maker page, it relied on the DataSlider (TestSlider) and HypoSlider along with their global variables to submit methods
// A mehtod is when a user borrows and/or makes artifcats, methods should have titles

const { Header, Content, Footer } = Layout;
const LandingPage = () => {
  
  return (
    <div>
      <SubmitMethod />
      <TestSlider />
      <HypoSlider />
    </div>
  );
};

export default LandingPage;