import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import contractABI from "../../constants/abi.json";
import addressOfContract from "../../constants/contractAddress";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import web3Modal from "web3modal";

export const AppContext = createContext();

const web3modal = new web3Modal({
  providerOptions: {
    walletlink: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Web 3 Modal Demo", // Required
        infuraId: process.env.INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
      },
    },
  },
});

const AppWrapper = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [streamKey, setStreamKey] = useState({
    currentKey: "",
    ingestUrl: "",
    playbackId: "",
  });
  const [account, setAccount] = useState({
    signer: null,
    contract: null,
  });

  /** contract Address and contract ABI  */
  const contractAddress = addressOfContract;
  const ABI = contractABI;

  useEffect(() => {
    connectWalletHandler();
  }, []);

  /** Function connectWalletHandler() sets the account Address */
  const connectWalletHandler = async () => {
    const provider = await web3modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const getSigner = library.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, getSigner);
    const accounts = await library.listAccounts();
    setIsConnected(true);

    setAccountAddress(accounts[0]);

    setAccount((prevState) => {
      return {
        ...prevState,
        signer: getSigner,
        contract: contract,
      };
    });
  };
  /**connectWalletHandler() ends here */

  /**This function provides worldcoin address to contract in order to verify them onchain */
  const provideWorldCoinAddress = async (
    signal,
    root,
    nullifierHash,
    proof
  ) => {
    const unpackedProof = ethers.utils.defaultAbiCoder.decode(
      ["uint256[8]"],
      proof
    )[0];
    console.log("hello world coin");
    const root1 = ethers.BigNumber.from(root);
    const nullifier = ethers.BigNumber.from(nullifierHash);
    console.log(root1);
    try {
      await account.contract.verifyAndExecute(
        signal,
        root1,
        nullifier,
        unpackedProof,
        { gasLimit: 600000 }
      );
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };
  /**provideWorldCoinAddress ends here */

  /**ADDS a new admin on smart contract */
  const addAdmin = async (newAdminAddress) => {};
  /**addAdmin ends here */

  /**Deletes an existing admin */
  const deleteAdmin = async (adminAddress) => {};
  /**deleteAdmin() ends here */

  /**Adds a new organiser of the existing event based on eventId */
  const addOrganiser = async (eventId, newOrganiserAddress) => {};
  /**addOrganiser ends here */

  /**Sets if an event is joinable or not */
  const setEventIsJoinable = async (eventId, isJoinable) => {};
  /**setEventIsJoinable ends here */

  /**Adds a new Event in the events array */
  const createNewEvent = async (name, uri, date, price, capacity) => {
    //That is how you need to call a function of smart contract @smoothy
    const newEvent = await account.contract.createEvent(
      name,
      uri,
      date,
      price,
      capacity,
      true
    ); //This function is not complete yet do not use it

    await newEvent.wait();
  };
  /**createNewEvent ends here */

  /** Function to get a single event based on eventId */
  const getSingleEvent = async (eventId) => {
    const tx = await account.contract.getEvent(eventId);

    console.log("Single event is ", tx);
  };
  /** getSingleEvent() ends here */

  const getOrganisedEvents = async () => {
    const organisedEvents = await account.contract.getOrganiserEventIds(
      accountAddress
    );

    console.log(organisedEvents);
    const num = Number(organisedEvents[0]._hex);
    console.log(num);
  };

  const getUserEvents = async () => {
    const userEvents = await account.contract.getUserEventIds(accountAddress);

    console.log(userEvents);
  };

  const canGoLive = (streamKey, playbackId) => {
    setStreamKey((prevState) => {
      return {
        currentKey: streamKey,
        ingestUrl: `srt://rtmp.livepeer.com:2935?${streamKey}`,
        playbackId: playbackId,
      };
    });
    setShowStreamKey(true);
  };
  /**This state is shared accross all the components => add any function or variable to use it in other component */
  const sharedState = {
    createNewEvent,
    provideWorldCoinAddress,
    showStreamKey,
    streamKey,
    canGoLive,
    accountAddress,
    getOrganisedEvents,
    connectWalletHandler,
    isConnected,
    getUserEvents,
    getSingleEvent,
  };

  return (
    <AppContext.Provider value={{ sharedState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppWrapper;
