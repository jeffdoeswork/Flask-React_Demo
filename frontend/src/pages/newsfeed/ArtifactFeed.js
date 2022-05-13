import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./UserFeed.css"
//Grabs both the hypo's and datas artifacts from the artifacts API

const ArtifactFeed = () => {
  const [userpost, setUserPost] = useState([]);
  const [email, setEmail] = useState({
    email : ""
  });
  //gets current email from api
  const getUser = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
    setEmail(data.data);
  }
  //gets all the artifacts from artifact api
  const fetchData = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/artifacts`);
    //console.log(data);
    //const { posts } = data.data
    setUserPost(data.data);
  }
  //sends data at launch of webpage
  useEffect(() => {
    getUser(); 
    fetchData(); 
  }, [])
  //console.log(userpost);

  //i have an if statment in and if statment
    //the first if checks to see if you're logged in 
    // the next if checks if its a data or hypo because data = blue and hypo = purple (very importaint)
    return (
      <div>
        {(userpost.artifacts)?.map((artifact) => {

              { if (artifact.email_datas) {
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
            } else {
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
        })}
      </div>
    )

};

export default ArtifactFeed
