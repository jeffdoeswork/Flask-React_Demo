import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './landingpage.css';
import { Layout, Modal, Button, Card, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DraftMethods from './DraftMethods'

import axios from 'axios';

//This landing page is acutally the Method Maker page, it relied on the DataSlider (TestSlider) and HypoSlider along with their global variables to submit methods
// A mehtod is when a user borrows and/or makes artifcats, methods should have titles

const { Header, Content, Footer } = Layout;
const LandingPage = (props) => {
  const {id} = useParams();
  const {method} = useParams();
  const [options, setOptions] = useState([]);
  const [methodtitle, setMethodtitle] = useState("");

  const getUserMethods = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/method/${id}/title/${props.email}`)
    if (data.data.items.length < 1) {
        console.log('You have no method!')
        const email_method = props.email
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        const title =  email_method + " draft-" + id.toString() + " " + date + month + min + sec
        const observation = id
        const dataz = await axios.post(`http://127.0.0.1:5000/methods/draft`, {email_method, title, observation})
        const data = await axios.get(`http://127.0.0.1:5000/method/${id}/title/${props.email}`)
        setOptions(data.data.items);
    }
    setOptions(data.data.items);
    }

    useEffect(() => {
      getUserMethods(); 
      }, [])

      const onClick = async ({ key }) => {
        const data = await axios.get(`http://127.0.0.1:5000/method/title/${key}`)
        setMethodtitle(data.data.title.title);
        console.log("new title title", data.data.title.title);
      };
      
    //const menu =  <Menu items = {(options)} />
    const menu =  <Menu
      onClick={onClick}
      items={
          options.map(opt => {
              return(
                  //{"key" : opt["key"], "label" : <Link to={`/explore/${id}/${opt["key"]}`}>{opt["label"]}</Link>}
                  {"key" : opt["key"], "label" : opt["label"]}
                  //opt["key"],
                  //opt["label"]
              )
          })
        } />

  if (props.email) {
    return (
      <div className='box'>
        <DraftMethods email={props.email} obsid={id} menu={menu} method={method} methodtitle={methodtitle}/>
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