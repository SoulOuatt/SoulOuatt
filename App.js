import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/local-exchange.json';


const contractAddress = "0xAC6C38E05D1e0f7FBB87938D4A7e82F4CB6807eF";
const contractABI = contract.abi;



function App(){

  const [currentAccount, setCurrentAddress] = useState(null);
  
  const getAddress = async () =>{
    const {ethereum} = window;
    const accounts = await ethereum.request({method: "eth_accounts"});
    const address = accounts[0];
  }

  const checkWalletIsConnected = async () =>{
    const {ethereum} = window;
    
    if(!ethereum){
      console.log("You need to install Metamask");
      return;
    }else{
      console.log("Metamask exists !");
    }

    const accounts = await ethereum.request({method: "eth_accounts"});

    if(accounts.length !== 0){
      const account = accounts[0];
      console.log("Found an address : ", account);
      setCurrentAddress(account);
    }else{
      console.log("No account found !");
    }
    
    
  }

  const connectWalletHandler = async () =>{
    const {ethereum} = window;

    if (!ethereum) {
      alert("Install Metamask");
    }
    
    try {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Found address : ", accounts[0]);
      setCurrentAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const mintHandler = () =>{}

  const connectWalletButton = () =>{
    return(
      <button onClick={connectWalletHandler} className="cta-btn connect-wallet-btn">
        Connect wallet
      </button>
    )
  }

  const mintBtn = () =>{
    return(
      <button onClick={mintHandler} className="cta-btn mint-btn">
        Mint
      </button>
    )
  }

  useEffect(() =>{
    checkWalletIsConnected();
  }, [])

  return(
    <div className='main-app'>
      <h1>Local Exhange</h1>
      <div>{currentAccount ? mintBtn() : connectWalletButton()}</div>
    </div>
  )

  
}


export default App;