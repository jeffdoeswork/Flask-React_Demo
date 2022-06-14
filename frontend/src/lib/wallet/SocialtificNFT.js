import "./SocialtificNFT.css"
import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";


const SocialtificNFT = (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    this.props.toggle();
  };

  const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
  };

  const getProvider = () => {
    if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      provider.connect({onlyIfTrusted: true});
      return provider;
      }
    }
  };
  
  const getAllNftData = async () => {
    try {
      // if (connectData === true) {
        debugger;
        const connect =  createConnectionConfig(clusterApiUrl("devnet"));
        const provider = getProvider();
        let ownerToken = provider.publicKey;
        const result = isValidSolanaAddress(ownerToken);
        console.log("result", result);
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
          connection: connect,
          serialization: true,
        });
        return nfts;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      setNftData(res);
      setLoading(true);
    }
    data();
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
