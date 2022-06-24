import React, {useState, useEffect} from 'react';
import { Row, Col, Modal, Button, Card, Avatar, Checkbox } from 'antd';
import axios from 'axios';

function TitleMethod(props) {
const [methodtitle, setMethodtitle] = useState("");

const handleChange = (e, field) => {
    setMethodtitle(e.target.value);
    }
  return (
    <div>
        <h2>This is the title to your current method: {props.title}</h2>
        <h3>Enter Title for your Method:</h3> 
        <form>
            <div>
                <input
                    onChange={(e) => handleChange(e, "methodtitle")}
                    type="text"
                    name="methodtitle"
                    id="methodtitle"
                    value={methodtitle}
                />
            </div>
        </form>
    </div>
  )
}

export default TitleMethod
