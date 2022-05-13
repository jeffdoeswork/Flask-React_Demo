
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  ExperimentOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CommentOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import Router from './Router';
import ProfileFeed from './pages/profilestuff/ProfileFeed';
import axios from 'axios';
// i use the App.js file to handel the nav bar, the nav bar is from the AntD css & react library i downloaded, its pretty straigh foroward

export default function App() {

  const [email, setEmail] = useState({
    email : ""
  });

  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    console.log(data);
    setEmail(data.data);
  }


  useEffect(() => {
    getUser(); 
  }, [])

  return (
    <div>
          <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <Menu
        defaultOpenKeys={['1']}
        defaultSelectedKeys={['1']}
        style={{ width: 300 }}
        mode="inline"
        theme="dark"
      >
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <a href="http://127.0.0.1:4000/newsfeed">Newsfeed</a>
          </Menu.Item>
          <Menu.Item key="7" icon={<ExperimentOutlined />}>
            <a href="http://127.0.0.1:4000/">Method Maker</a>
          </Menu.Item>
          { email.email ? <></> :
          <Menu.Item key="2" icon={<UserOutlined />}>
            <a href="http://127.0.0.1:4000/register">Register</a>
          </Menu.Item>
          }
          { email.email ? <></> :
          <Menu.Item key="3" icon={<LoginOutlined />}>
            <a href="http://127.0.0.1:4000/login"> Login</a>
          </Menu.Item>
          }
          { email.email ?
          <Menu.Item key="2" icon={<CommentOutlined />}>
            <a href="http://127.0.0.1:4000/my_account">{ email.email }</a>
          </Menu.Item>
          : <></>}
          { email.email ?
          <Menu.Item key="10" icon={<LogoutOutlined />}>
            <a href="http://127.0.0.1:4000/logout">Logout</a>
          </Menu.Item>
          : <></>}
      </Menu>
    </div>

      <Router />
    </div>
  )
}
