import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { Button, Carousel } from "antd";
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import "./TestSlider.css"
import axios from 'axios';

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
  const [toggle, setToggle] = useState(false);
  const ref = useRef();
  const [datamethodid, setDatamethodid] = useState(0);
  window.$datamethodid = datamethodid //global variable


  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/datas`)
    const { datas } = data.data
    setDataList(datas);
    console.log(dataList);
  }
  const [email, setEmail] = useState({
    email : ""
  });
  
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    console.log(data);
    setEmail(data.data);
  }
  const handleChange = (e, field) => {
    setBody(e.target.value);
  }
  function toggler() {
    if (toggle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  useEffect(() => {
    getUser(); 
  }, [])
  useEffect(() => {
    fetchData(); 
  }, [])
 

  const goTo = (slide) => {
    ref.current.goTo(slide, false);
  };

  const [stylechange, setStylechange] = useState("");

  const handleSubmit = async (idlength) => {
    const body_email = email.email
    try {
      const data = await axios.post(`http://127.0.0.1:5000/datas`, {body, body_email})
      // something is broken with the slider
      //setDataList([...dataList, data.data]);
      ///setDataList([data.data]);
      setBody('');
      fetchData();
      setStylechange(dataList.length + 1);
      ref.current.goTo(dataList.length, false);
      setDatamethodid(idlength);
      toggler();
      
      
  } catch (err) {
    console.error(err.message); 
    }
  }

  if (email.email) {

  return (
  <div>
    <h2>Borrow or Make a Data Artifact</h2>

      <div>
          <Carousel ref={ref} dots={false} slidesToShow={1}>
              {dataList.map(image => {
                  return (
                      <div className="slider_section">

                              <div className="data_testslider_border">
                                { toggle ? 
                                  <div>
                                    <h2> Enter your new Data below: </h2>
                                    <form onSubmit={handleSubmit}>
                                  <div className='entry_box'>
                                    <input
                                      onChange={(e) => handleChange(e, "body")}
                                      type="text"
                                      name="body"
                                      id="body"
                                      value={body}
                                    />
                                    
                                    <br></br>
                                    <Button type="primary" onClick={() => handleSubmit((dataList.length + 1))}>Submit</Button> 
                                    <Button type="danger" onClick={() => toggler()} >Cancel</Button>
                                  </div>
                                </form>
                                </div>
                                :
                                <div>
                                <h3 class="">
                                  <span className="left-text">User:{image.email_datas}</span>
                                  <span className="text-left-righ">Artifact ID:{image.id}</span>
                                </h3>
                                  <h3>{image.datas}</h3>
                                  <Button type="primary" style={{ background: "#e9d900", borderColor: "#e9d900" }} 
                                    onClick={() => {setStylechange(image.id);
                                      setDatamethodid(image.id);}
                                    }> 
                                    Borrow Artifact </Button>
                                  <Button type="primary" onClick={() => {setDatamethodid(image.id); toggler();}} >Make Artifact</Button>
                              </div>
                              }
                              
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
  {dataList.map(datanumber => {
      return (
          <div>
              <p className={`btnSelected ${datanumber.id === stylechange ? "classname" : "btnNormal"}`} key={datanumber.id} onClick={() => goTo(datanumber.id  - 1)}> {datanumber.id }</p>
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