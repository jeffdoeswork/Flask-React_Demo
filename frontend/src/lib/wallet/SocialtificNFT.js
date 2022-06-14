import "./SocialtificNFT.css"
import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
const axios = require('axios');

const SocialtificNFT = (props) => {

  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    props.toggle();
  };

  const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
  };
  
  const getAllNftData = async () => {
    try {
        const connect =  createConnectionConfig(clusterApiUrl("devnet"));
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
    for (let i = 0; i < n; i++) {
      console.log(data[i].data.uri);
      let val = await axios.get(data[i].data.uri);
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
                <h4 className="title">NFT</h4>
              </div>
            </div>
            <div className="row  d-flex justify-content-center">
              {loading ? (
                <>
                  {nftData &&
                    nftData.length > 0 &&
                    nftData.map((val, ind) => {
                      return (
                        <div className="col-4 mt-3" key={ind}>
                          <div className="cart text-center">
                            <div className="img mt-4 pt-3">
                              <img src={val.data.image} alt="loading..." />
                              <p className="mt-1">{val.data.name}</p>
                              <h6 className=" mt-2">
                                {val.data.description}
                              </h6>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
