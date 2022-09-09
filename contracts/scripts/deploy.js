const hre = require("hardhat");
require("dotenv").config();
const { NETWORKS_LOOKUP, POLYGON_SCAN_STUB } = require("./constants.js")

const constructorArgs = require('./constructorArgs');
const adminAccounts = require('./adminTestAccounts');
let networkName, networkId, contractAbi

const main = async () => {
  
  const worldcoin_addr = process.env.WORLDID_ADDR
  console.log("worldcoin addr: " + worldcoin_addr)
  
  const days = 60 * 60 * 24 * 1000
  const withdrawBuffer = 3 * days

  const d3ventContractFactory = await hre.ethers.getContractFactory('d3vent');
  const d3ventContract = await d3ventContractFactory.deploy(...constructorArgs);
  await d3ventContract.deployed();
  console.log("Contract deployed to: ", d3ventContract.address);
  console.log(POLYGON_SCAN_STUB + d3ventContract.address);

  const contractNetwork = await d3ventContract.provider.getNetwork()
  networkId = contractNetwork.chainId.toString()
  
  // if not Hardhat i.e. local do some pipeline actions
  if(networkId != "31337") {
    networkName = NETWORKS_LOOKUP.get(networkId)

    // output contract address to current address quick reference file and log file
    console.log("writing contract address reference files")
    // log the deployment addresses to quick reference file
    await writeFileDeployAddr(d3ventContract.address)
    // create an export file for contract address. pipeline: imported by the frontend
    await writeExportContractAddr("../client/contract/contractAddress.js", d3ventContract.address)
    // create and abi file. pipeline: imported by the frontend
    await writeABI()

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

async function writeExportContractAddr(filepath, contractAddress) {
  const fs = require('fs');
  const content = "module.exports = [\n    " + contractAddress +"\n]"
  console.log(filepath)
  console.log(content)
  fs.writeFileSync(filepath, content, err => {
    if (err) {
      console.error(err)
    }
  })
}

// pipeline: take the abi out of the contract artifacts file and create
// an abi.json file and create an abi file for the front end to import
async function writeABI () {
  const fs = require('fs');
  const contractArtifacts = fs.readFileSync('./artifacts/contracts/d3vent.sol/d3vent.json', 'utf8');
  const abi = JSON.parse(contractArtifacts).abi;
  fs.writeFileSync('../client/contract/abi.json', JSON.stringify(abi, null, 2), err => {
    if (err) {
      console.error(err)
    }
  })
  console.log(abi)
}