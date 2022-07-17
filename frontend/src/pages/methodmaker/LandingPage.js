import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './landingpage.css';
import { Row, Col, Layout, Modal, Button, Card, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DraftMethods from './DraftMethods'
import axios from 'axios';

//This landing page is acutally the Method Maker page, it relied on the DataSlider (TestSlider) and HypoSlider along with their global variables to submit methods
// A mehtod is when a user borrows and/or makes artifcats, methods should have titles

const { Header, Content, Footer } = Layout;
const LandingPage = (props) => {
  const {id} = useParams();
  const [methodtitle, setMethodtitle] = useState("");
  const [method, setMethod] = useState([]);

  const handleChange = (e, field) => {
    setMethodtitle(e.target.value);
  }
  const handleSubmit = async () => {
    try {
      const email_method = props.email
      const title = methodtitle
      const observation = id
      const data = await axios.post(`http://127.0.0.1:5000/methods/draft`, {email_method, title, observation})
      getMethod();
    } catch (err) {
    console.error(err.message); 
    message.warning('That title is already taken! Or my code just sucks, sorry');
    } 
  }
  const getMethod = async () => {
    try {
      const dataz = await axios.get(`http://127.0.0.1:5000/method/a/${methodtitle}`)
      setMethod(dataz.data.method)
    } catch (err) {
      console.error(err.message); 
      } 
  }

  if (props.email) {
    return (
      <div className='box'>
        <Row>
        <Col span={1}> </Col>
        <Col span={6}>
          <h3>Enter a Title for your Method:</h3> 
        </Col>
        <Col span={4}> 
        <form onSubmit={e => { e.preventDefault(); }}>
            <div>
                <input
                    onChange={(e) => handleChange(e, "methodtitle")}
                    type="text"
                    name="methodtitle"
                    id="methodtitle"
                    value={methodtitle}
                />
            </div>
        </form>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={() => handleSubmit()}>Submit</Button>
        </Col> 
        <Col span={8}></Col>
        </Row>
      <br></br>
        <DraftMethods 
          email={props.email}
          obsid={id}
          method={method}
          />
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