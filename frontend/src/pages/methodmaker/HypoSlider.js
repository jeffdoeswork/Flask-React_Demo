import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { Button, Carousel, Pagination, Avatar, Card } from "antd";
import { Link } from 'react-router-dom';
import "./TestSlider.css"
import axios from 'axios';

//This file is for the Hypothesis Artifact Slider, its twins with DataSlider ArtifactSlider is the file name
//idk what this does
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const HypoSlider = () => {
  const [body, setBody] = useState("");
  const [hypoList, setHypoList] = useState([]);
  const [hypoId, setHypoId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const ref = useRef();
  const [hypomethodid, setHypomethodid] = useState(0);
  window.$hypomethodid = hypomethodid //global variable
  
  //get data artifacts api
  const fetchData = async () => {
    const data = await axios.get('http://127.0.0.1:5000/hypos')
    const { hypos } = data.data
    setHypoList(hypos);
    console.log(hypoList);
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
 
  //this is an antD  (css/react library i downloaded) , it lets you make your custom pagination for Carousels
  const goTo = (slide) => {
    ref.current.goTo(slide, false);
  };

  const [stylechange, setStylechange] = useState("");

  //make function for GOTO
  function sendHypo(props) {
    const hypo_len = hypoList.length
    ref.current.goTo(hypo_len, false);
  };

  //The work horse of this Hyposlider components. Calls in a lot of help from other funcitons
  const handleSubmit = async (idlength) => {
    const body_email = email.email
    try {
      const data = await axios.post(`http://127.0.0.1:5000/hypos`, {body, body_email})
      // something is broken with the slider
      //setHypoList([...hypoList, data.data]);
      ///setHypoList([data.data]);
      setBody('');
      fetchData();
      setStylechange(hypoList.length + 1);
      setHypomethodid(idlength);
      window.$hypomethodid = hypomethodid //global variable
      sendHypo();
      toggler();
      
      
  } catch (err) {
    console.error(err.message); 
    }
  }

  if (email.email) {

  return (
  <div>

    <h2>Borrow or Make a Hypothesis Artifact</h2>

      <div>
          <Carousel ref={ref} dots={false} slidesToShow={1}>
              {hypoList.map(image => {
                  return (
                    <Card bordered={false}>
                      <div className="slider_section">
                              <div className="hypo_testslider_border">
                                { toggle ? 
                                  <div>
                                    <h2> Enter your new Hypothesis below: </h2>
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
                                    <Button type="primary" onClick={() => handleSubmit((hypoList.length + 1))}>Submit</Button> 
                                    <Button type="danger" onClick={() => toggler()} >Cancel</Button>
                                  </div>
                                </form>
                                </div>
                                :
                                <div>
                                <h3 class="">
                                  <span className="left-text">User:{image.email_hypos}</span>
                                  <span className="text-left-righ">Artifact ID:{image.id}</span>
                                </h3>
                                  <h3>{image.hypos}</h3>
                                  <Button type="primary" style={{ background: "#e9d900", borderColor: "#e9d900" }} onClick={() => {setStylechange(image.id); setHypomethodid(image.id);}}> Borrow Artifact </Button>
                                  <Button type="primary" style={{ background: "#cb0fb8", borderColor: "#cb0fb8" }}onClick={() => {setHypomethodid(image.id); toggler();}} >Make Artifact</Button>
                              </div>
                              }
                          </div>
                        </div>
                      </Card>
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

  {hypoList.map(datanumber => {
      return (
          <div>
              <p className={`btnSelected ${datanumber.id === stylechange ? "classname" : "btnNormal"}`} key={datanumber.id} onClick={() => goTo(datanumber.id  - 1)}> {datanumber.id }</p>
          </div>
          
      )
  })}
  </div>
</div>
  );} else {
    return ( <h2></h2>)
  }
};
export default HypoSlider;