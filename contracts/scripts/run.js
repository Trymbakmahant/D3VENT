const hre = require("hardhat");
require("dotenv").config();
const { ErrorCode } = require("@ethersproject/logger");
const constructorArgs = require('./constructorArgs');


async function main() {

    const worldcoin_addr = process.env.WORLDID_ADDR
    console.log("worldcoin addr: " + worldcoin_addr)

    const days = 60 * 60 * 24 * 1000
    const withdrawBuffer = 3 * days

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const d3ventContractFactory = await hre.ethers.getContractFactory('d3vent');
    const d3ventContract = await d3ventContractFactory.deploy(...constructorArgs);
    await d3ventContract.deployed();

    console.log("Contract deployed to: ", d3ventContract.address);
    console.log("Contract deployed by: ", owner.address);
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
