import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { useNavigate } from "react-router-dom";

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
  const [allEvents, setAllEvents] = useState();
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

  const navigate = useNavigate();

    /** contract Address and contract ABI  */
  const contractAddress = addressOfContract;
  const ABI = contractABI;

  useEffect(() => {
    navigate('/');  
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
      getAllEvents(contract);
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
    const setEventIsJoinable = async (eventId, isJoinable) =>{
        const tx = await account.contract.setEventIsJoinable(eventId, isJoinable);

        await tx.wait();

        console.log(tx);
    }
    /**setEventIsJoinable ends here */

    // This function will get all the events ever registered
    const getAllEvents = async (contract) => {
      
        const  allEvents = await contract.getAllEvents();
        setAllEvents(allEvents);

    }
    // getAllEvents ends here

    /**Adds a new Event in the events array */
    const createNewEvent = async (name, uri, date, description) => {

        //That is how you need to call a function of smart contract @smoothy
        const newEvent = await account.contract.createEvent(name, description, uri,'', date, 0, false); 

        await newEvent.wait();
    }
    /**createNewEvent ends here */

    const isEventJoined = async (id) => {
      const isJoined = await account.contract.isJoined(id, accountAddress);
      console.log(isJoined);
      return isJoined;
    }

    /** Function to get a single event based on eventId */
    const getSingleEvent = async (eventId) =>{

        const tx = await account.contract.getEvent(eventId);

        return tx;

    };
    /** getSingleEvent() ends here */


    const getUserEventIds = async () => {
      const ids = await account.contract.getUserEventIds(accountAddress);
      return ids;
    }

    const joinEvent = async (id) => {
      const tx = await account.contract.joinEvent(id);

      await tx.wait();
    }

    const getOrganisedEvents = async () => {

        const organisedEvents = await account.contract.getOrganiserEventIds(accountAddress);

        const num = organisedEvents.map((organisedEvent) => {
            return Number(organisedEvent._hex)
        });

       return num;
    }


    const getUserEvents = async () => {
        const userEvents = await account.contract.getUserEventIds(accountAddress);

    }

    const canGoLive = (streamKey, playbackId) => {
        setStreamKey((prevState) => {
            return {
                currentKey: streamKey,
                ingestUrl: `srt://rtmp.livepeer.com:2935?${streamKey}`,
                playbackId: playbackId
            }
        })
        setShowStreamKey(true);
    }
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
        setEventIsJoinable,
        getAllEvents,
        allEvents,
        isEventJoined,
        joinEvent,
        getUserEventIds
    };

    return (
        <AppContext.Provider value = {{sharedState}}>
            {props.children}
        </AppContext.Provider>
    );

};

export default AppWrapper;
