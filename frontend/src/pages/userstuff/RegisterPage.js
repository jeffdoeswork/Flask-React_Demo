import React, {useState} from 'react'
import axios from 'axios';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import RegisterPhantom from '../../lib/wallet/RegisterPhantom';

//simple post api to create user with hased email, the backend api handles the hash part
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const onFinish = (values) => {
    //console.log('Success:', values);
    console.log('Success:');
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const registerUser = async () => {
    console.log(email, password)

    try {
      const resp = await axios.post(`http://127.0.0.1:5000/register`, {
        email,
        password,
      });
      setMessage("User is Made! Go to the Login page");
      window.location.href = "/login";
    } catch (error) {
     if (error.response.status === 400) {
      alert("Maybe this email is already in use?");
      setMessage("That Username is taken");
    }
  }
  };

  return (
    <div>
      <Row>
    <Col span={8}> </Col>
    <Col span={8}>
    <Card style={{ width: 450 }}>
    <h1>Sign Up with Socialtific</h1>
    { message }
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
            message: 'Create a new username!',
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
        <Button type="primary" htmlType="submit" onClick={() => registerUser()}>
          Submit
        </Button>
        <hr/>
        <RegisterPhantom></RegisterPhantom>
      </Form.Item>
    </Form>
  </Card>
  </Col>
  <Col span={8}> </Col>
  </Row>
    </div>
  )
}

export default RegisterPage;