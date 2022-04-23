import React, {useState} from 'react'
import httpClient from '../httpClient';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(email, password)

    try {
      const resp = await httpClient.post(`http://127.0.0.1:5000/login`, {
        email,
        password,
      });
      fetch(url, {
        credentials: 'include'
        })
      window.location.href = "/test";
    } catch (error) {
     if (error.response.status === 401) {
      alert("Invalid credentials");
    }
  }
  };

  return (
    <div>
      <h1>Login to Your Account</h1>
      <form>
        <div>
          <lable>Email:</lable>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            id="" />
        </div>
        <div>
          <lable>Password:</lable>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            id="" />
        </div>
        <button type="button" onClick={() => logInUser()}>Submit</button>
      </form>
    </div>
  )
}

export default LoginPage;
