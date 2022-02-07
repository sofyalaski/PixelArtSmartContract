import {pinJSONToIPFS} from './pinata.js'
//import ReactDOM from "react-dom";
//import CanvasDraw from "react-canvas-draw";
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contract = require("../PixelArt.json")
const contractAddress = "0x1624D0d4Bf09cb353D417a36a78cBFd53c1a0044"

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };


export const mintNFT = async(url, name, description) => {

  //error handling
  if ((url.trim() === "" || name.trim() === "" || description.trim() === "")) { 
      return {
          success: false,
          status: "❗Please make sure all fields are completed before minting.",
      }
  }
  // eslint-disable-next-line no-new-object
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url; //https://gateway.pinata.cloud/ipfs/QmYocuLWiZAoPGjkgZT3rzLbDickqGY5bMiPphGf56q35c
  metadata.description = description;
  

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  const tokenURI = pinataResponse.pinataUrl;  

  //load smart contract
  window.contract = await new web3.eth.Contract(contract.abi, contractAddress);//loadContract();
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    gas_limit:7600000,
    //maxPriorityFeePerGas: 2.6,
    //maxFeePerGas:2.6,

    'data': window.contract.methods.mintPixelArt(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
  };

  //sign transaction via Metamask
  try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      console.log(txHash)
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
  
}

//  const canvas = document.getElementById("drawingPanel")
//  window.open(canvas.toDataURL('image/png'));

