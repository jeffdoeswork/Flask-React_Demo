import React, {useState, useEffect} from 'react';
import axios from 'axios';
import httpClient from '../httpClient';

const Test = () => {
  const [user, setUser] = useState({
    email : ""
  });

  useEffect(() => {
    (async () => {
      //try {
        const resp = await httpClient.get(`http://127.0.0.1:5000/test`);

        setUser(resp.data);
      //} catch (error) {
      //  console.log("Not Authenticated");
      //}
    })();
  }, []);



  return (
    <div>
      <h1>This should be secret!</h1>
    </div>
  )
};

export default Test;
