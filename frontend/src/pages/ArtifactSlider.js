import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { Button, Carousel } from "antd";
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import "./TestSlider.css"
import axios from 'axios';

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
  const [body, setBody] = useState("");
  const [dataList, setDataList] = useState([]);
  const [dataId, setDataId] = useState(null);
  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/datas`)
    const { datas } = data.data
    setDataList(datas);
  }
  const [email, setEmail] = useState({
    email : ""
  });

const [isOpened, setIsOpened] = useState(false);

function toggle() {
  setIsOpened(wasOpened => !wasOpened);
}

  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    console.log(data);
    setEmail(data.data);
  }
  const handleChange = (e, field) => {
    setBody(e.target.value);
  }

  useEffect(() => {
    fetchData(); 
    getUser(); 
  }, [])

  const ref = useRef();

  const goTo = (slide) => {
    ref.current.goTo(slide, false);
  };

  const [stylechange, setStylechange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    getUser(); 
    var body_email = email.email;
    
    try {
      
      console.log(body_email)
      const data = await axios.post(`http://127.0.0.1:5000/datas`, {body, body_email})
      setDataList([...dataList, data.data]);
      setBody('');
      fetchData();
  } catch (err) {
    console.error(err.message); 
    }
  }

  if (email.email) {

  return (
  <div>
      <div className="directions">
        <form onSubmit={handleSubmit}>
          <h1>Socialtific Method Maker</h1>
          <h2>Make a Data Artifact</h2>
          <input
            onChange={(e) => handleChange(e, "body")}
            type="text"
            name="body"
            id="body"
            value={body}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
          <Carousel ref={ref} afterChange={onChange} dots={false} slidesToShow={1}>
              {dataList.map(image => {
                  return (
                      <div className="slider_section">
                          <div className="slider_border">
                            <h3 className="email" key={image.id}>User: {image.email_datas}</h3>
                              <h3 key={image.id}>{image.datas}</h3>
                              
                              {isOpened && (
                                <div className="boxContent">
                                        <div className="directions">
                                          <form onSubmit={handleSubmit}>
                                            <h1>Socialtific Method Maker</h1>
                                            <h2>Make a Data Artifact</h2>
                                            <input
                                              onChange={(e) => handleChange(e, "body")}
                                              type="text"
                                              name="body"
                                              id="body"
                                              value={body}
                                            />
                                            <br></br>
                                            <button type="submit">Submit</button>
                                          </form>
                                        </div>
                                </div>
                              )}

                              <div classname="borrow_button">
                                <Button type="primary" onClick={() => setStylechange(image.id)}> Borrow Artifact </Button>
                                <span></span>
                                <Button type="primary" onClick={() => toggle()} style={{ background: "green", borderColor: "green" }}> New Artifact </Button>
                              </div>
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
  {dataList.map(image => {
      return (
          <div>
              <p className={`btnSelected ${image.id === stylechange ? "classname" : "btnNormal"}`} key={image.id -1} onClick={() => goTo(image.id -2 )}> {image.id -1}</p>
          </div>
          
      )
  })}
  </div>
</div>
  );} else {
    return ( <h2>Register and Login with an account to use the Method Maker</h2>)
  }
};
export default TestSlider;