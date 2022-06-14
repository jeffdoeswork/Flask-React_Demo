import React from "react";
import SocialtificNFT from "./SocialtificNFT"; 
import { Form, Input, Button, Card, Row, Col } from 'antd';

export default class RegisterPhantom extends React.Component {
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <Button type="primary">Register via Phantom Wallet</Button>
        </div>
        {this.state.seen ? <SocialtificNFT toggle={this.togglePop} /> : null}
      </div>
    );
  }
}
