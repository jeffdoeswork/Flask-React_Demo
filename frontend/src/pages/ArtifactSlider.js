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

const testCarousel = [
  {
    id: 1,
    uri: "Post #1"
  },
  {
    id: 2,
    uri: "Second post 2"
  },
  {
    id: 3,
    uri: "Third 3"
  },
  {
    id: 4,
    uri: "last 4"
  }
];

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const TestSlider = () => {
  const ref = useRef();

  const goTo = (slide) => {
    ref.current.goTo(slide, false);
  };

  const [stylechange, setStylechange] = useState("");


  
  return (
  <div>
      <div>
          <Carousel ref={ref} afterChange={onChange} dots={false} slidesToShow={1}>
              {testCarousel.map(image => {
                  return (
                      <div className="slider_section">
                          <div className="slider_border">
                              <h3 key={image.id}>{image.uri}</h3>
                              <Button type="primary" onClick={() => setStylechange(image.id)}> Borrow Artifact </Button>

                          </div>
                      </div>
                  )
              })}
      </Carousel>
    </div>
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
  {testCarousel.map(image => {
      return (
          <div>
              <p className={`btnSelected ${image.id === stylechange ? "classname" : "btnNormal"}`} key={image.id} onClick={() => goTo(image.id -1 )}> {image.id}</p>
          </div>
          
      )
  })}
  </div>
</div>
  );
};
export default TestSlider;