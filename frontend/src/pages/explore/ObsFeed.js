import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Avatar, Card } from "antd";
import { Link } from 'react-router-dom';
import './ObsArtifact.css';

const ObsFeed = () => {
  const { Meta } = Card;
  const [body, setBody] = useState("");
  const [obslist, setObsList] = useState([]);
  const [email, setEmail] = useState({
    email : ""
  });

  const fetchObs = async () => {
      const data = await axios.get(`http://127.0.0.1:5000/observations`)
      console.log(data, "obs obs obs");
      setObsList(data.data.observations);
      }

  const getUser = async () => {
      const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
      setEmail(data.data);
    }
    const handleChange = (e, field) => {
      setBody(e.target.value);
    }

    const handleSubmit = async () => {
      const body_email = email.email
      try {
        const data = await axios.post(`http://127.0.0.1:5000/observations`, {body, body_email})
        setBody('');
        fetchObs();
        
    } catch (err) {
      console.error(err.message); 
      }
    }

  useEffect(() => {
    getUser(); 
    }, [])
  useEffect(() => {
    fetchObs(); 
  }, [])

  return (
    <div>
        <h2>Research an Observation or make your own</h2>

        <form onSubmit={handleSubmit}>
        <div className='entry_box' style={{ width: "100%" }}>
        <textarea
            rows="2"
            cols="60"
            onChange={(e) => handleChange(e, "body")}
            type="text"
            name="body"
            id="body"
            value={body}
            placeholder="Observation: An objective question or view on a particular subject"
        />
        
        <br></br>
            <Button type="primary" onClick={() => handleSubmit()}>Submit</Button> 
        </div>
  </form>

  <br></br>

    {obslist?.map(obs => {
        return(
          <div style={{ padding:"5px"}}>
          <div className="obs_artifact">
            <Card bordered={false} bodyStyle={{ padding: "5px"}}>
            <Meta
                avatar={<Link to={`/users/${obs.email_obs}`}>
                    <Avatar size={60}>
                    {obs.email_obs}
                    </Avatar>
                    </Link>}

                title={obs.created_at}
            />
                <h3 key={obs.id}>
                    { (obs.observation).length < 225?
                    (obs.observation)
                    :
                    ((obs.observation).substring(0, 225) + '...')
                    }
                </h3>
                <br></br>
            </Card>

            </div>
        </div>
        )
    })}




    </div>
  )
}

export default ObsFeed
