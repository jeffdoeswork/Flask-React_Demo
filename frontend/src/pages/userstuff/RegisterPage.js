import React, {useState} from 'react'
import axios from 'axios';

//simple post api to create user with hased email, the backend api handles the hash part
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

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
      setMessage("Maybe this email is already in use?");
    }
  }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <button type="button" onClick={() => registerUser()}>Submit</button>
      </form>
      { message }
    </div>
  )
}

export default RegisterPage;