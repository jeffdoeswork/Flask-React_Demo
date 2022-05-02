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
    const data = await axios.get(`http://127.0.0.1:5000/dataz`);
    //console.log(data);
    //const { posts } = data.data
    setUserPost(data.data);


  }

  useEffect(() => {
    getUser(); 
  }, [])

  useEffect(() => {
    fetchData(); 
  }, [])
  
  console.log(userpost);

  if (email.email) {
    return (
      <div>
      <h2> Hello { email.email }</h2>
      <ul>
        {(userpost.data).map(artifact => {
          return (
            <li key={artifact.id}>
              {artifact.datas}
            </li>
          )
        })}
    </ul>
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
/*{userpost.map((post) => {
  return (
  <h3 key={post.id}>{ post.datas } </h3>
)}
)}*/
/*<div>
{userpost.map(post => {
  return (
  <h3 key={image.id}>{ post } </h3>
)}
)}
</div>*/

/*<ul>
{
  userpost.map(function(post){
    // returns Nathan, then John, then Jane
    return <li> {post.email_datas} as the {post.datas} </li>
  })
}
</ul>*/