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

  /*const token = localStorage.getItem('jwtToken')

  
  const api = `http://127.0.0.1:5000/test`
  axios.get(api, { Cookies: {"token" : `${token}`}})
          .then(res => {
              console.log(res.data);
          this.setState({
              items: res.data, 
              isLoaded : true,
              redirectToReferrer: false
          })
        })*/


  /*const token = localStorage.getItem('jwtToken') //Or however you choose to get it
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const [email, setUser] = useState({
    email : ""
  });

  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { headers: authHeader() })
    setUser(data.data);
  }

  useEffect(() => {
    getUser(); 
  }, [])*/

  /*useEffect(() => {
    (async () => {
      //try {
        const resp = await httpClient.get(`http://127.0.0.1:5000/test`);

        setUser(resp.data);
      //} catch (error) {
      //  console.log("Not Authenticated");
      //}
    })();
  }, []);*/



  return (
    <div>
      <h1>This should be secret!</h1>
    This is secret: { email.email }
    </div>
  )
};

export default Test;
