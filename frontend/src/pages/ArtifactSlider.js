import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';

import { Button, Carousel } from "antd";

import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import "./TestSlider.css"
//import Carousel from "react-elastic-carousel";

function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const TestSlider = () => {
  return (
  <div>
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </div>
  );
};

export default TestSlider;