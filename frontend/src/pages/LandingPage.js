import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import TestSlider from './ArtifactSlider';

const LandingPage = () => {


  return (
    <div>
      <h1>Welcome to Method Maker</h1>
      <br></br>
      <TestSlider />
    </div>
  );
};

export default LandingPage;
