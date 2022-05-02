import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Test = () => {
  const [userpost, setUserPost] = useState([]);
  const [email, setEmail] = useState({
    email : ""
  });
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    setEmail(data.data);
  }

  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/datas`);
    //console.log(data);
    //const { posts } = data.data
    setUserPost(data.data);


  }

  useEffect(() => {
    getUser(); 
    fetchData(); 
  }, [])

  
  console.log(userpost);

  if (email.email) {
    return (
      <div>
      <h2> Hello { email.email }</h2>
        {(userpost.datas)?.map(artifact => {
          return (
            <h3 key={artifact.id}>
              {artifact.datas}
            </h3>
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
      <h2> You should Probably login</h2>
      </div>
    )
  }

};

export default Test;
