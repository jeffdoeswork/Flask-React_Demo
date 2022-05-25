import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Avatar, Card } from 'antd';
import DataArtifact from '..//artifacts/DataArtifact';
import HypoArtifact from '..//artifacts/HypoArtifact';

import "./UserFeed.css"
//Grabs both the hypo's and datas artifacts from the artifacts API

const ArtifactFeed = () => {
  const { Meta } = Card;
  const [userpost, setUserPost] = useState([]);
  const [email, setEmail] = useState({
    email : ""
  });
  //gets current email from api
  const getUser = async () => {
    const data = await axios.get(`http://18.189.1.180:5000/test`, { withCredentials: true })
    setEmail(data.data);
  }
  //gets all the artifacts from artifact api
  const fetchData = async () => {
    const data = await axios.get(`http://18.189.1.180:5000/artifacts`);
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
              <div>
                <Card>
                  <DataArtifact dataid={artifact.id} />
                  <br></br>
                </Card>
              </div>
                )
            } else {
              return (
              <div>
                <Card>
                <HypoArtifact hypoid={artifact.id} />
                <br></br>
                </Card>
              </div>
              )
            }
          }
        })}
      </div>
    )

};

export default ArtifactFeed
