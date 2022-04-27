import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Test = () => {

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

  if (email.email) {
    return (
      <h2> Hello { email.email }</h2>
    )
  } else {
    return (
      <h2> You should Probably login</h2>
    )
  }

};

export default Test;
