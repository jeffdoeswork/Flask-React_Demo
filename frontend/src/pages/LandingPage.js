import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';

const LandingPage = () => {
const [user, setUser] = useState({
  id : "",
  email : ""
});

//{
//  id: "",
//  email: ""
//});

useEffect(() => {
  (async () => {
    try {
      const resp = await httpClient.get(`http://127.0.0.1:5000/login`);
      setUser(resp.data);
    } catch (error) {
      console.log("Not Authenticated");
    }
  })();
}, []);


  return (
    <div>
      <h1>Welcome to Method Maker</h1>
      <br></br>
      {user != null ? (
        <div>
          <h1>You're logged in</h1>
          <br></br>
          <h3>Email: {user.email}</h3>
        </div>
      ) : ( 
        <div>
          <p>You are not logged in</p>
          <div>
            <Link to='/login'>
              <button>Login</button> 
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
        )}
    </div>
  );
};

export default LandingPage;
