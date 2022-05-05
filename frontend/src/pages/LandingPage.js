import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';
import HypoSlider from './HypoSlider';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
//This landing page is acutally the Method Maker page, it relied on the DataSlider (TestSlider) and HypoSlider along with their global variables to submit methods
// A mehtod is when a user borrows and/or makes artifcats, methods should have titles

const { Header, Content, Footer } = Layout;
const LandingPage = () => {
  //These 2 variables are actually global variables
  const [methoddata, setMethoddata] = useState(0);
  const [methodhypo, setMethoddhypo] = useState(0);
  
  
  //when you click the first button it finds the global varables based on what artifacts are "borrowed", they're ID's should be golden
  //the 2nd button just logs what artifacts you've borrowed
  return (
    <div>
        <Button onClick={() => {setMethoddata(window.$datamethodid); setMethoddhypo(window.$hypomethodid)}}>Submit Method</Button>
        <Button onClick={() => console.log('Using Data: ' + methoddata + ' and Hypo: ' + methodhypo)}>Log Data Method</Button>
        <h3>react - get artifact key's element by id</h3>
      <TestSlider />
      <HypoSlider />
    </div>
  );
};

export default LandingPage;