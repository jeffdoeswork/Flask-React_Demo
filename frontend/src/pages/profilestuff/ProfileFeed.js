import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./UserFeed.css"
import DataArtifact from '..//artifacts/DataArtifact';
import HypoArtifact from '..//artifacts/HypoArtifact';
import { Card } from 'antd';


// this is actually the user profile page, its static url so you can't look at other users. This will go through big changes hopeflly soon
//it also shows all the artfiacts that user had made, a lot of the code is the same from the ArtifactFeed.js file
const ProfileFeed = (props) => {
  const [userpost, setUserPost] = useState([]);
  const { Meta } = Card;

  const fetchArtifacts = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/artifacts/${props.user}`);
    //console.log(data);
    //const { posts } = data.data
    setUserPost(data.data);
  }

  useEffect(() => {
    fetchArtifacts(); 
  }, [])

  // copies with double if statmens from the ArtifactFeed.js file, this way it only shows the users' artifacts, blue for data and purple for hypo
    return (
      <div>
        {(userpost.artifacts)?.map((artifact) => {
                { if (artifact.datas) {
                  return (
                    <div>
                      <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                        <DataArtifact dataid={artifact.id} />
                        <br></br>
                      </Card>
                    </div>
                  )
              } else if (artifact.hypos) {
                return (
                  <div>
                    <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                    <HypoArtifact hypoid={artifact.id} />
                    <br></br>
                    </Card>
                  </div>
                )
              }
            }
          }
        ) 
        }
      </div>
    )

};

export default ProfileFeed;
