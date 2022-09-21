const hre = require("hardhat");
require("dotenv").config();
const { NETWORKS_LOOKUP, POLYGON_SCAN_STUB, MUMBAI_SCAN_STUB, VERIFY_COMMAND } = require("./constants.js")

const debug = false // extra console loggin

const constructorArgs = require('./constructorArgs');
const adminAccounts = require('./adminTestAccounts');
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers.js");
const { Signer } = require("ethers");
let networkName, networkId, srs
let d3ventContract

assignSigners = async () => srs = await hre.ethers.getSigners()
  assignSigners()


const main = async () => {
  console.log("contructor args:", constructorArgs)

  try{
    const d3ventContractFactory = await hre.ethers.getContractFactory('d3vent');
    d3ventContract = await d3ventContractFactory.deploy(...constructorArgs);
    await d3ventContract.deployed();
    console.log("Contract deployed to: ", d3ventContract.address);
    console.log(MUMBAI_SCAN_STUB + d3ventContract.address);
    console.log(POLYGON_SCAN_STUB + d3ventContract.address);
  } catch (error) {
    console.log(error)
    return
  }

  console.log("verify command: ", VERIFY_COMMAND.replace("<REPLACE WITH CONTRACT ADDRESS>", d3ventContract.address))

  const contractNetwork = await d3ventContract.provider.getNetwork()
  networkId = contractNetwork.chainId.toString()
  networkName = NETWORKS_LOOKUP.get(networkId)
  console.log("Network: %s %s", networkId, networkName )
  
  
  //create events
  try {
    console.log("create events")

    // event name, event uri, playbackUri, dateTime, duration, isJoinable
    await d3ventContract.createEvent("inaugural event", "something for everyone", "https://drive.google.com/uc?export=view&id=1O2PruQVDFw3O8HZOqbZfgZaZdt67Lzpj", "https://livepeer.org/123", 1662994265000, 1800000, true)
    await d3ventContract.createEvent("second event", "not safe for work", "https://drive.google.com/uc?export=view&id=1N_iZ7G_Zlv85ZEwpPPt_Jd50sKm21Iyx", "https://livepeer.org/456",    1673994265000, 3600000, true)
    await d3ventContract.createEvent("thrid event", "meet the geeks", "https://drive.google.com/uc?export=view&id=1O2PruQVDFw3O8HZOqbZfgZaZdt67Lzpj", "https://livepeer.org/789",     1683994265000, 5400000, true)
    await d3ventContract.createEvent("fourth event", "mumbai networking", "https://drive.google.com/uc?export=view&id=1N_iZ7G_Zlv85ZEwpPPt_Jd50sKm21Iyx", "https://livepeer.org/101112", 1686994265000, 7200000, true)
    await d3ventContract.createEvent("fifth event", "premier of latest movie", "https://drive.google.com/uc?export=view&id=1DfNtVTT51M5FWwArvf3Bpme4M3Qadzku", "https://livepeer.org/131415",  1685994265000, 9000000, true)



  } catch (error) {
    console.log("createEvent: ", error)
  }


  // join events
  try {
    console.log("join events")
    await d3ventContract.joinEvent(0)
    await d3ventContract.joinEvent(1)
    await d3ventContract.joinEvent(2)
  } catch (error) {
    console.log("joinEvent: ", error)
  }


  // set sfIndexIds
  try {
    console.log("set/get events' sfIndexIds")
    await d3ventContract.setSfIndexId(0, 101010)
    await d3ventContract.setSfIndexId(1, 12345)
    await d3ventContract.setSfIndexId(2, 67890)
  } catch (error) {
    console.log("set sfIndexId: ", error)
  }


  // can log data to console for debugging
  try {

    if(false) {
      console.log(await d3ventContract.getEvent(0))
      console.log(await d3ventContract.getOrganiserEventIds(srs[0].address))
      console.log(await d3ventContract.getUserEventIds(srs[0].address))
      console.log(await d3ventContract.getAllEvents())
    }
  } catch (error) {
    console.log("get events and ids: ", error)
  }


  // if not Hardhat i.e. local do some pipeline actions
  if(networkId != "31337") {

    // output contract address to current address quick reference file and log file
    console.log("writing contract address reference files")
    // log the deployment addresses to quick reference file
    await writeFileDeployAddr(d3ventContract.address)
    // create an export file for contract address. pipeline: imported by the frontend
    await writeExportContractAddr("../client/src/constants/contractAddress.js", d3ventContract.address)
    // create and abi file. pipeline: imported by the frontend
    await writeABI('../client/src/constants/abi.json')

    // setup teammate test accounts as contract admins
    for(const account of adminAccounts) {
      console.log("adding admin account: ", account)
      try {
        await d3ventContract.addAdmin(account)
        if(! (await d3ventContract.isAdmin(account))) {throw "couldn't verify account added: ", account}
      } catch (err) {
        console.log(err)
      }
    }
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});


async function writeFileDeployAddr(contractAddress) {
  const fs = require('fs');
  let isoTime = new Date(Date.now()).toISOString().replace("T"," ").slice(0,19)
  let content = isoTime + "\t" + contractAddress + '\t' + networkName + '\t' + networkId + "\n"
  console.log(content)
  
  // just the current/latest one
  fs.writeFileSync('./deployAddress.txt', content, err => {
    if (err) { console.error(err) }
  })

  // keep a history
  fs.appendFileSync('./deployAddressesLog.txt', content, err => {
    if (err) { console.error(err) }
  })
}

async function writeExportContractAddr(outFilepath, contractAddress) {
  const fs = require('fs');
  const content = "const addressofContract = '" + contractAddress +"'\nexport default addressofContract;"

  console.log(outFilepath)
  console.log(content)
  fs.writeFileSync(outFilepath, content, err => {
    if (err) {
      console.error(err)
    }
  })
}

// pipeline: take the abi out of the contract artifacts file and create
// an abi.json file and create an abi file for the front end to import
async function writeABI (outFilepath) {
  const inFilePath = './artifacts/contracts/d3vent.sol/d3vent.json'

  const fs = require('fs');
  const contractArtifacts = fs.readFileSync(inFilePath, 'utf8');
  const abi = JSON.parse(contractArtifacts).abi;
  fs.writeFileSync(outFilepath, JSON.stringify(abi, null, 2), err => {
    if (err) {
      console.error(err)
    }
  })
  if(debug){console.log(abi)}
}