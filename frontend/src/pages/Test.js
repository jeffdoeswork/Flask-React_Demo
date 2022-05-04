import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./UserFeed.css"

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
    const data = await axios.get(`http://127.0.0.1:5000/artifacts`);
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
        {(userpost.artifacts)?.map((artifact) => {


              { if (email.email === artifact.email_datas) {
                return (
              <div className="user_slider_section">
                <div className="data_slider_border">
                <h3 className="email">User: {artifact.email_datas}</h3>

                  <h3 key={artifact.id}>
                    {artifact.datas}  
                  </h3>
                </div>
              </div>
                )
            } else if (email.email === artifact.email_hypos) {
              return (
              <div className="user_slider_section">
                <div className="hypo_slider_border">
                <h3 className="email">User: {artifact.email_hypos}</h3>

                  <h3 key={artifact.id}>
                    {artifact.hypos}  
                  </h3>
                </div>
              </div>
              )
            }
          }

          }
        ) 
        }
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
