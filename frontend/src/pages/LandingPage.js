import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';
import HypoSlider from './HypoSlider';
import MethodMaker from './MethodMaker';
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer } = Layout;
const LandingPage = () => {
  const [methoddata, setMethoddata] = useState(0);
  const [methodhypo, setMethoddhypo] = useState(0);
  
  

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