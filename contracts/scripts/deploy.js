const hre = require("hardhat");
require("dotenv").config();
const { NETWORKS_LOOKUP, POLYGON_SCAN_STUB } = require("./constants.js")

const debug = false // extra console loggin

const constructorArgs = require('./constructorArgs');
const adminAccounts = require('./adminTestAccounts');
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers.js");
const { Signer } = require("ethers");
let networkName, networkId, srs

assignSigners = async () => srs = await hre.ethers.getSigners()
  assignSigners()


const main = async () => {
  console.log("contructor args:", constructorArgs)

  const d3ventContractFactory = await hre.ethers.getContractFactory('d3vent');
  const d3ventContract = await d3ventContractFactory.deploy(...constructorArgs);
  await d3ventContract.deployed();
  console.log("Contract deployed to: ", d3ventContract.address);
  console.log(POLYGON_SCAN_STUB + d3ventContract.address);

  const contractNetwork = await d3ventContract.provider.getNetwork()
  networkId = contractNetwork.chainId.toString()
  networkName = NETWORKS_LOOKUP.get(networkId)
  console.log("Network: %s %s", networkId, networkName )
  
  //create events
  try {
    console.log("create events")
    // event name, event uri, dateTime, duration, price, capacity, isJoinable
    await d3ventContract.createEvent("inaugural event", "https://livepeer.org/123", 1662994265000, 1800000, 1000, 100 ,true)
    await d3ventContract.createEvent("second event", "https://livepeer.org/456",    1673994265000, 3600000, 2000, 2000, true)
    await d3ventContract.createEvent("thrid event", "https://livepeer.org/789",     1683994265000, 5400000, 3000, 3000, true)
    await d3ventContract.createEvent("fourth event", "https://livepeer.org/101112", 1686994265000, 7200000, 4000, 40000, true)
    await d3ventContract.createEvent("fifth event", "https://livepeer.org/131415",  1685994265000, 9000000, 5000, 50000, false)
  } catch (error) {
    console.log("createEvent: ", error)
  }

  // join events
  try {
    console.log("join events")
    await d3ventContract.joinEvent(0, {value: ethers.utils.parseUnits("1000", 'wei').toHexString()})
    await d3ventContract.joinEvent(1, {value: ethers.utils.parseUnits("2000", 'wei').toHexString()})
    await d3ventContract.joinEvent(2, {value: ethers.utils.parseUnits("3000", 'wei').toHexString()})
  } catch (error) {
    console.log("joinEvent: ", error)
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