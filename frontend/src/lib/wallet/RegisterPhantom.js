import React, { useEffect, useState} from "react";
import SocialtificNFT from "./SocialtificNFT"; 
import { Form, Input, Button, Card, Row, Col } from 'antd';

const RegisterPhantom = (props) => {
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(false);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);
  const [seen, setSeen] = useState(false);

  const togglePop = async () => {
    if (connected == false) {
      try {
        await provider?.connect();
        setConnected(true);
        setSeen(true);
        setPubKey(provider.publicKey);
      }
      catch (err) {
        setConnected(false);
        setSeen(false);  
        setPubKey(null);
      }
    }
    else {
      try {
        await provider?.disconnect();
        setConnected(false);
        setSeen(false);
        setPubKey(null);
      }
      catch(err) {
        setConnected(true);
        setSeen(true);
        setPubKey(provider.publicKey);
      }
    }
  };

  useEffect(()=> {
    if ("solana" in window) {
      if (window.solana.isPhantom) {
        setProvider(window.solana);
        setWalletAvail(true);
        window.solana.connect({onlyIfTrusted: true});
      }
    }
  }, []);

  return (
    <div>
      <div className="btn" onClick={togglePop}>
        <Button type="primary">Register via Phantom Wallet</Button>
      </div>
      {seen ? <SocialtificNFT toggle={togglePop} pubKey={pubKey} provider={provider} /> : null}
    </div>
  );
}

export default RegisterPhantom;