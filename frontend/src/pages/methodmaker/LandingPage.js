import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import TestSlider from '../methodmaker/ArtifactSlider';
import 'antd/dist/antd.css';
import './landingpage.css';
import HypoSlider from '../methodmaker/HypoSlider';
import { Layout, Menu, Modal, Button, Card } from 'antd';
import SubmitMethod from './SubmitMethod'
import axios from 'axios';

//This landing page is acutally the Method Maker page, it relied on the DataSlider (TestSlider) and HypoSlider along with their global variables to submit methods
// A mehtod is when a user borrows and/or makes artifcats, methods should have titles

const { Header, Content, Footer } = Layout;
const LandingPage = () => {
  const {id} = useParams();
  const [email, setEmail] = useState({
    email : ""
  });
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    setEmail(data.data);
  }
  
  useEffect(() => {
    getUser(); 
  }, [])

  if (email.email) {
    return (
      <div className='box'>
        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
          <SubmitMethod obsid={id}/>
          <br></br>
          <TestSlider obsid={id}/>
          <HypoSlider obsid={id}/>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
      <h2> You should Probably login</h2>
      </div>
    );
  }
}
export default LandingPage;