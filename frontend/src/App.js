
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import { Layout, Menu } from 'antd';
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
import ProfileFeed from './pages/profilestuff/ProfileFeed';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LandingPage from './pages/methodmaker/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/userstuff/LoginPage';
import UserDashboard from './pages/profilestuff/UserDashboard';
import RegisterPage from './pages/userstuff/RegisterPage';
import Logout from './pages/userstuff/Logout';
import NewsFeed from './pages/newsfeed/NewsFeed';
// i use the App.js file to handel the nav bar, the nav bar is from the AntD css & react library i downloaded, its pretty straigh foroward
const { Header, Content, Footer, Sider } = Layout;

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
  <BrowserRouter>

  <Layout hasSider>
    <div>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Menu
        style={{ width: 300 }}
        mode="inline"
        theme="dark"
      >
          <Menu.Item key="1" icon={<UnorderedListOutlined />}>
            <Link to="/newsfeed">Newsfeed</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ExperimentOutlined />}>
            <Link to="/">Method Maker</Link>
          </Menu.Item>
          { email.email ? <></> :
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          }
          { email.email ? <></> :
          <Menu.Item key="4" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          }
          { email.email ?
          <Menu.Item key="5" icon={<CommentOutlined />}>
            <Link to="/my_account">{ email.email }</Link>
          </Menu.Item>
          : <></>}
          { email.email ?
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
          : <></>}
      </Menu>
      </Sider>

    </div>
  </Layout>
  <Layout
      style={{
        marginLeft: 200,
      }}
    >
    <Layout
      style={{
        marginTop: 25,
      }}
    >
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/newsfeed"  element={<NewsFeed />}/>
          <Route path="/login"  element={<LoginPage />}/>
          <Route path="/register"  element={<RegisterPage />}/>
          <Route path="*"  element={<NotFound />} />
          <Route path="/my_account" element={<UserDashboard />}/>
          <Route path="/logout"  element={<Logout />}/>
        </Routes>
      </Layout>
    </Layout>
  </BrowserRouter>
  )
}
