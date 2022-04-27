
import React from 'react';
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
  MenuFoldOutlined
} from '@ant-design/icons';
import Router from './Router';

export default function App() {
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
          <Menu.Item key="7" icon={<ExperimentOutlined />}>
            <a href="http://127.0.0.1:4000/">Home</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <a href="http://127.0.0.1:4000/register">Register</a>
          </Menu.Item>
          <Menu.Item key="3" icon={<LoginOutlined />}>
            <a href="http://127.0.0.1:4000/login"> Login</a>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <a href="http://127.0.0.1:4000/test">Test</a>
          </Menu.Item>
          
      </Menu>
    </div>

      <Router />
    </div>
  )
}
