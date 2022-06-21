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

const TestSlider = (props) => {
  const [body, setBody] = useState("");
  const [dataList, setDataList] = useState([]);
  const [dataId, setDataId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const ref = useRef();
  const [datamethodid, setDatamethodid] = useState();
  const [stylechangelist, setStylechangelist] = useState([]);
  const [realstylechangelist, setRealStylechangelist] = useState([]);

  window.$datamethodid = stylechangelist //global variable for data artifact's ID
  const { Meta } = Card;

  //get data artifacts api
  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/datas/${props.obsid}`)
    const { datas } = data.data
    setDataList(datas);
  }
  const [email, setEmail] = useState({
    email : ""
  });
  //get current user's email
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
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
    setStylechangelist([]);
    setRealStylechangelist([]);
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
  }

  function printmethodid() {
    console.log("this should work and show the method id", props.method_id)
  }

  function borrowThree(data_id, swipe) {
    if (stylechangelist.length < 3) {
      setStylechangelist(stylechangelist =>[...stylechangelist, data_id]);
      setRealStylechangelist(realstylechangelist =>[...realstylechangelist, swipe]);
      updateDataList();
    } else {  
      stylechangelist.splice(0 , 1);
      realstylechangelist.splice(0 , 1);
      setStylechangelist(stylechangelist =>[...stylechangelist, data_id]);
      setRealStylechangelist(realstylechangelist =>[...realstylechangelist, swipe]);
      updateDataList();
    }
  }

  const removeItem = (index, swipe) => {
    const newPeople = stylechangelist.filter((person) => person !== index);
    const realnewPeople = realstylechangelist.filter((person) => person !== swipe);
    setStylechangelist(newPeople);
    setRealStylechangelist(realnewPeople);
    window.$datamethodid = newPeople
  }

  //Update data id in the database
  const handleDataArtifact = async (data) => {
    console.log("breakingeng", data, props.method_id)
    const method = props.method_id
    try {
      const dataz = await axios.post(`http://127.0.0.1:5000/methoddatas`, {data, method})
      
  } catch (err) {
    console.error(err.message); 
    }
  }

  //The work horse of this DataSlider (named ArtifactSlider) components. Calls in a lot of help from other funcitons
  const handleSubmit = async () => {
    const body_email = email.email
    const observation = props.obsid
    try {
      const data = await axios.post(`http://127.0.0.1:5000/datas`, {body, body_email, observation})
      // something is broken with the slider
      //setDataList([...dataList, data.data]);
      ///setDataList([data.data]);
      setBody('');
      fetchData();
      //borrowThree(dataList.length + 1, swipe);
      ref.current.goTo(dataList.length);
      //setDatamethodid(idlength);
      window.$datamethodid = datamethodid //global variable for data artifact's ID
      toggler();
  } catch (err) {
    console.error(err.message); 
    }
  }

  /*const handelData = async (new_data) => {
    const data = await axios.put(`http://127.0.0.1:5000//method/datas/${id}`, {new_data})

  }*/
  useEffect(() =>{
    printmethodid();
  }, [])

  if (email.email) {

  if (dataList.length < 1) {
    return(
      <div>
      <h2> Enter the first data: </h2>
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
      <Button type="primary" onClick={() => handleSubmit()}>Submit</Button> 
    </div>
  </form>
  </div>
    )
  }
  return (
  <div>
    <h2>Borrow or Make up to 3 Data Artifacts</h2>
    {props.method_data}
    <div className='entry_box'>
    <Button style={{ flex: "center" }} type="primary" onClick={() => {toggler();}} >Make a new Data Artifact</Button>
    </div>
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
                            <Button type="primary" onClick={() => handleSubmit()}>Submit</Button> 
                            <Button type="danger" onClick={() => toggler()} >Cancel</Button>
                          </div>
                        </form>
                        </div>
                        :
                        <div                                
                          style={{
                            marginLeft: 15,
                            marginRight: 5,
                            marginTop: 4,
                            }}>
                            <Meta
                                bodyStyle={{ padding: "1px"}}
                                avatar={<Link to={`/users/${image.email_datas}`}>
                                <Avatar size={60}>{image.email_datas}</Avatar>
                                </Link>
                              }
                                title={"Artifact ID: " + image.swipe}
                          />
                          <h4 key={image.id}>
                              { (image.datas).length < 130?
                              (image.datas)
                              :
                              ((image.datas).substring(0, 130) + '...')
                              }
                          </h4>

                          { realstylechangelist.includes(image.swipe) ?
                          <Button type="primary" onClick={ () => removeItem(image.id, image.swipe)}>Don't Borrow</Button>

                          :
                            <Button type="primary" style={{ background: "#e9d900", borderColor: "#e9d900" }} 
                              onClick={() => {
                                setDatamethodid(image.id);
                                borrowThree(image.id, image.swipe);
                                handleDataArtifact(image.id);
                                }
                              }> 
                              Borrow Artifact </Button>
                          }
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
            { realstylechangelist.includes(datanumber.swipe) ?
              <p className="btnSelected"  key={datanumber.id} onClick={() => goTo(datanumber.swipe)}> 
                {datanumber.swipe + 1 }
              </p>
              :
              <p className="btnNormal"  key={datanumber.id} onClick={() => goTo(datanumber.swipe)}> 
              {datanumber.swipe + 1 }
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