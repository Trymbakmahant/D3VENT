import { createContext, useState } from "react";
import { ethers } from "ethers";

import { contractABI, addressOfContract } from "../../constants";

export const AppContext = createContext();

const AppWrapper = (props) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [account, setAccount] = useState({
    signer: null,
    contract: null,
  });

  /** contract Address and contract ABI  */
  const contractAddress = addressOfContract;
  const ABI = contractABI;

  /** Function setAddress() sets the account Address */
  const setAddress = (address) => {
    setAccountAddress(address);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const getSigner = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, getSigner);

    setAccount((prevState) => {
      return {
        ...prevState,
        signer: getSigner,
        contract: contract,
      };
    });
  };
  /**setAdress() ends here */

  /**This function provides worldcoin address to contract in order to verify them onchain */
  const provideWorldCoinAddress = async (
    signal,
    root,
    nullifierHash,
    proof
  ) => {
    await account.contract.verifyAndExecute(signal, root, nullifierHash, proof);
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
  const createNewEvent = async (eventData) => {
    //That is how you need to call a function of smart contract @smoothy
    await account.contract.createEvent(); //This function is not complete yet do not use it
  };
  /**createNewEvent ends here */

  /** Function to get a single event based on eventId */
  const getSingleEvent = async (eventId) => {};
  /** getSingleEvent() ends here */

  /**This state is shared accross all the components => add any function or variable to use it in other component */
  const sharedState = {
    accountAddress,
    setAddress,
    createNewEvent,
    provideWorldCoinAddress,
  };

  return (
    <AppContext.Provider value={{ sharedState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppWrapper;
