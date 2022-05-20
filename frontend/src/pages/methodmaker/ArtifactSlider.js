import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { Button, Carousel, Avatar, Card } from "antd";
import { Link } from 'react-router-dom';
import "./TestSlider.css"
import axios from 'axios';
//This file is for the Data Artifact Slider, its twins with HypoSlider

//idk what this does
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
  const [stylechangelist, setStylechangelist] = useState([]);
  window.$datamethodid = stylechangelist //global variable for data artifact's ID
  const { Meta } = Card;

  //get data artifacts api
  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/datas`)
    const { datas } = data.data
    setDataList(datas);
    console.log(dataList);
  }
  const [email, setEmail] = useState({
    email : ""
  });
  //get current user's email
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    console.log(data);
    setEmail(data.data);
  }
  const handleChange = (e, field) => {
    setBody(e.target.value);
  }
  //toggles view for borrow or make artifact
  function toggler() {
    if (toggle) {
      setToggle(false)
    } else {
      setToggle(true)
    }
  }

  //at the launch of webpage grabs the user and all the data artifacts
  useEffect(() => {
    getUser(); 
  }, [])
  useEffect(() => {
    fetchData(); 
  }, [])
 
  //this is an antD (css/react library i downloaded), it lets you make your custom pagination for Carousels
  const goTo = (slide) => {
    ref.current.goTo(slide, false);
  };

  function updateDataList() {
    window.$datamethodid = stylechangelist
    console.log(stylechangelist, "good list");
  }

  function borrowThree(data_id) {
    if (stylechangelist.length < 3) {
      setStylechangelist(stylechangelist =>[...stylechangelist, data_id]);
      updateDataList();
    } else {
      stylechangelist.splice(0 , 1);
      setStylechangelist(stylechangelist =>[...stylechangelist, data_id]);
      updateDataList();
    }
  }

  const removeItem = (index) => {
    console.log(stylechangelist);
    const newPeople = stylechangelist.filter((person) => person !== index);
    setStylechangelist(newPeople);
    console.log(newPeople);
    window.$datamethodid = newPeople
  }

  //The work horse of this DataSlider (named ArtifactSlider) components. Calls in a lot of help from other funcitons
  const handleSubmit = async (idlength) => {
    const body_email = email.email
    try {
      const data = await axios.post(`http://127.0.0.1:5000/datas`, {body, body_email})
      // something is broken with the slider
      //setDataList([...dataList, data.data]);
      ///setDataList([data.data]);
      setBody('');
      fetchData();
      borrowThree(dataList.length + 1);
      ref.current.goTo(dataList.length, false);
      setDatamethodid(idlength);
      window.$datamethodid = datamethodid //global variable for data artifact's ID
      toggler();
      
      
  } catch (err) {
    console.error(err.message); 
    }
  }

  if (email.email) {

  return (
  <div>
    <h2>Borrow or Make up to 3 Data Artifacts</h2>

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
                        <div                                
                          style={{
                            marginLeft: 25,
                            marginTop: 10,
                            }}>
                            <Meta
                                avatar={<Avatar size={60}>{image.email_datas}</Avatar>}
                                title={"Artifact ID: " + image.id}
                          />
                          <h3>{image.datas}</h3>

                          { stylechangelist.includes(image.id) ?
                          <Button type="primary" onClick={ () => removeItem(image.id)}>Don't Borrow</Button>

                          :
                            <Button type="primary" style={{ background: "#e9d900", borderColor: "#e9d900" }} 
                              onClick={() => {
                                setDatamethodid(image.id);
                                borrowThree(image.id);
                                }
                              }> 
                              Borrow Artifact </Button>
                          }
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
            { stylechangelist.includes(datanumber.id) ?
              <p className="btnSelected"  key={datanumber.id} onClick={() => goTo(datanumber.id  - 1)}> 
                {datanumber.id }
              </p>
              :
              <p className="btnNormal"  key={datanumber.id} onClick={() => goTo(datanumber.id  - 1)}> 
              {datanumber.id }
            </p>
            }
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