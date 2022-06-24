import "./SocialtificNFT.css"
import 'react-image-picker/dist/index.css'
import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import ImagePicker from 'react-image-picker';
import { Form, Input, Button, Card, Row, Col } from 'antd';

const axios = require('axios');

const SocialtificNFT = (props) => {

  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  
  const SocialtificNFTDescription = 'SocialiticsTest Test NFTs';

  const handleClick = () => {
    if (image == null)
      props.onOK(null);
    else {
      props.onOK(nftData[image.value].data);
    }
  };

  const onPick = (selected) => {
    setImage(selected);
  }

  const createConnection = () => {
    return new Connection(clusterApiUrl("mainnet-beta"));
  };
  
  const getAllNftData = async () => {
    try {
        const connect =  createConnectionConfig(clusterApiUrl("mainnet-beta"));
        const result = isValidSolanaAddress(props.pubKey);
        console.log("IsValidSolanaAddress: ", result);
        if (result == false)
          return [];

        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: props.pubKey,
          connection: connect,
          serialization: true,
        });
        setNftData(await filterNFTs(nfts));
        setLoading(true);  
    } catch (error) {
      console.log(error);
    }
  };

  const filterNFTs = async (nftData) => {
    var data = Object.keys(nftData).map((key) => nftData[key]);
    let arr = [];
    let n = data.length;
    let socialtificnfts = ["4PnW7sbxxqMDKXxkamekfxAL4EEfEQqRxLSG1BVSFgW7"]
    for (let i = 0; i < n; i++) {
      console.log(data[i].data.uri);
      let val = await axios.get(data[i].data.uri);
      if (val != null && val.data != null && socialtificnfts.indexOf(val.data.address))
      arr.push(val);
    }
    console.log(JSON.stringify(arr));
    return arr;
  }

  useEffect(() => {
    getAllNftData();
  }, []);


  return (
    <div className="modal">
      <div className="modal_content">
        <section className="nft mt-2 my-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-12">
                <h3 className="title">SocialiticsTest Test NFTs</h3>
              </div>
            </div>
            <div className="row  d-flex justify-content-center">
              {loading ? (
                <>
                <ImagePicker
                  images={nftData.map((val, ind) => ({src: val.data.image, value: ind}))}
                  onPick={onPick}
                />
                <Button type="primary" onClick={handleClick}>OK</Button>
                </>
              ) : (
                <>
                  <p className="text-center">loading...</p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SocialtificNFT;
