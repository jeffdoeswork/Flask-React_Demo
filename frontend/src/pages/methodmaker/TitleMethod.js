import React, {useState, useEffect} from 'react';
import { Row, Col, Modal, Button, Card, Avatar, Checkbox } from 'antd';
import axios from 'axios';

function TitleMethod(props) {
  return (
    <div>
        <h2>This is the title to your current method: {props.title}</h2>
    </div>
  )
}

export default TitleMethod
