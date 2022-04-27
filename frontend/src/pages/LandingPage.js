import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
const LandingPage = () => {

  return (
    <div>
      <TestSlider />
    </div>
  );
};

export default LandingPage;