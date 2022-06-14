import React, {useState} from 'react'
import axios from 'axios';
import { Form, Input, Button, Card, Row, Col } from 'antd';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = (values) => {
    //console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
  };
  const logInUser = async () => {
    //this fancy post lets you login and it saves cookies to the browser, the refresh cookies should time out after an hour
    try {
      const resp = await axios.post(`http://127.0.0.1:5000/login`, {
        email,
        password,
      }, {withCredentials: true})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
      fetch(resp, {
        credentials: 'include'
        });
      window.location.href = "/";
    } catch (error) {
     if (error.response.status === 400) {
      alert("Invalid credentials, might be a bad password");
    } else {
      alert("Invalid credentials, probably not the right email");
    }
  }
  };

  return (
    <div>
    <Row>
    <Col span={8}> </Col>
    <Col span={8}>
    <Card style={{ width: 450 }}>
    <h1>Login</h1>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          id=""
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          id=""
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => logInUser()}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Card>
  </Col>
  <Col span={8}> </Col>
  </Row>
  </div>
  )
}

export default LoginPage;