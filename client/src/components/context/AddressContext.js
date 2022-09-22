import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { customHttpProvider } from "../superfluid/config";

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
  const id = Math.floor(Math.random() * 1000000000);
  const DAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

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
      // await checkIsVerified();
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

  //createIndex starts here
  const createIndex = async () => {
    
    const sf = await Framework.create({
      chainId: 80001,
      provider: customHttpProvider,
    });
    const signer = sf.createSigner({
      privateKey:
        "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
      provider: customHttpProvider,
    });
    try {
      const createIndexOperation = sf.idaV1.createIndex({
        indexId: id,
        superToken: DAIx,
        // userData?: string
      });
  
      console.log("Creating your Index...");
  
      await createIndexOperation.exec(signer);
  
      console.log(
        `Congrats - you've just created a new Index!
         Network: Goerli
         Super Token: DAIx
         Index ID: ${id}
      `
      );
    } catch (error) {
      console.error(error);
    }
    return id;
  };
//createIndex ends here

async function distribute(id, amount) {
  const sf = await Framework.create({
    chainId: 80001,
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider,
  });

  const DAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

  try {
    const distributeOperation = sf.idaV1.distribute({
      indexId: id,
      superToken: DAIx,
      amount: amount,
      // userData?: string
    });

    console.log("Distributing funds to your index subscribers...");

    await distributeOperation.exec(signer);

    console.log(
      `Congrats - you've just sent funds to your index!
       Network: Goerli
       Super Token: DAIx
       Index ID: ${id}
       Total Sent: ${amount}
    `
    );
  } catch (error) {
    console.error(error);
  }
}


  //Starts here
  const updateSubscription = async (id, address, shares) => {
    const sf = await Framework.create({
      chainId: 80001,
      provider: customHttpProvider,
    });
    const signer = sf.createSigner({
      privateKey:
        "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
      provider: customHttpProvider,
    });
    try {
      const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
        indexId: id,
        superToken: DAIx,
        subscriber: address,
        units: shares,
        // userData?: string
      });
  
      console.log("Updating your Index...");
  
      await updateSubscriptionOperation.exec(signer);
  
      console.log(
        `Congrats - you've just updated an Index!
           Network: Goerli
           Super Token: DAIx
           Index ID: ${id}
           Subscriber: ${address}
           Units: ${shares} units
           
        `
      );
    } catch (error) {
      console.error(error);
    }
  };
  //Update ends here

    /**Sets if an event is joinable or not */
    const setEventIsJoinable = async (eventId, isJoinable) =>{
        const tx = await account.contract.setEventIsJoinable(eventId, isJoinable);

        await tx.wait();

        console.log(tx);
    }
    /**setEventIsJoinable ends here */

    // This function will get all the events ever registered
    const getAllEvents = async (contract) => {
      
        const allEvents = await contract.getAllEvents();
        setAllEvents(allEvents);

    }
    // getAllEvents ends here

    /**Adds a new Event in the events array */
    const createNewEvent = async (indexId, name, uri, date, description) => {
        let superfluidIndex = +indexId;
        //That is how you need to call a function of smart contract @smoothy
        const newEvent = await account.contract.createEvent(name, description, superfluidIndex, uri,'', date, 0, false); 
        await newEvent.wait();

        navigate('/');

        getAllEvents(account.contract);

    }
    /**createNewEvent ends here */

    const isEventJoined = async (eventIdNumber) => {
      const isJoined = await account.contract.isJoined(eventIdNumber, accountAddress);
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

    const joinEvent = async (eventIDNumber) => {
      const tx = await account.contract.joinEvent(eventIDNumber);

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

    const checkIsVerified = async () =>{
      const isVerified = await account.contract.isVerified(accountAddress);
      console.log(isVerified);
      return isVerified;
    }

    const canGoLive = async (streamKey, playbackId, eventId) => {
        const id = +eventId;
        const tx = await account.contract.setEventPlaybackUri(id, playbackId);
        await tx.wait();
        
        setStreamKey((prevState) => {
            return {
                currentKey: streamKey,
                ingestUrl: `srt://rtmp.livepeer.com:2935?streamid=${streamKey}`,
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
        getUserEventIds,
        createIndex,
        checkIsVerified,
        updateSubscription,
        distribute
    };

    return (
        <AppContext.Provider value = {{sharedState}}>
            {props.children}
        </AppContext.Provider>
    );

};

export default AppWrapper;
