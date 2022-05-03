import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';
import HypoSlider from './HypoSlider';

import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer } = Layout;
const LandingPage = () => {

  return (
    <div>
      <Button>Submit Method</Button>
    <h4>react - get artifact key's element by id</h4>
      <TestSlider />
      <HypoSlider />
    </div>
  );
};

export default LandingPage;