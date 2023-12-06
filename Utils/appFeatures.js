import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    AsvTokenAddress,
    AsvTokenABI,
    
    RitikTokenABI,
   
    SingleSwapTokenABI,
    SwapMultiHopAddress,
    SwapMultiHopABI,
    userStorageDataAddrss,
  userStorageDataABI,
    IWETHABI,
   
  } from "../context/constants";

  //CHECK IF WALLET IS CONNECT
export const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };

  //CONNECT WALLET
export const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };

  //ASV TOKEN FETCHING
export const fetchAsvContract = (signerOrProvider) =>
  new ethers.Contract(AsvTokenAddress, AsvTokenABI, signerOrProvider);

  //CONNECTING With ASV TOKEN CONTRACT
export const connectingWithAsvToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchAsvContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  //RITIK TOKEN FETCHING
  const RitikTokenAddress = "0x0724F18B2aA7D6413D3fDcF6c0c27458a8170Dd9";
  export const fetchRitikContract = (signerOrProvider) =>
new ethers.Contract(RitikTokenAddress, RitikTokenABI, signerOrProvider);

//CONNECTING With RITIK TOKEN CONTRACT

export const connectingWithRitikToken = async () => {
try {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = fetchRitikContract(signer);
  return contract;
} catch (error) {
  console.log(error);
}
};

//FETCHING CONTRACT------------------------

//SingleSwapToken TOKEN FETCHING
const SingleSwapTokenAddress = "0x687bB6c57915aa2529EfC7D2a26668855e022fAE";
export const fetchSingleSwapContract = (signerOrProvider) =>
new ethers.Contract(
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  signerOrProvider
);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithSingleSwapToken = async () => {
try {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = fetchSingleSwapContract(signer);
  return contract;
} catch (error) {
  console.log(error);
}
};




//IWTH TOKEN FETCHING
const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const fetchIWTHContract = (signerOrProvider) =>
new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithIWTHToken = async () => {
try {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = fetchIWTHContract(signer);
  return contract;
} catch (error) {
  console.log(error);
}
};

//fetching dai

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) =>
  new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//USER CONTRACT CONNECTION---------
export const fetchUserStorageContract = (signerOrProvider) =>
  new ethers.Contract(
    userStorageDataAddrss,
    userStorageDataABI,
    signerOrProvider
  );

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithUserStorageContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchUserStorageContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

