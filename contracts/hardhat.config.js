require("dotenv").config();
//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter"); 
require('hardhat-log-remover');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  settings: {
    optimizer: {
      enabled: false,
      runs: 200,
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  gasReporter: {
    //enabled: (process.env.REPORT_GAS) ? true : false,
    enabled: true,
    token: "MATIC",
    currency: 'USD',
    gasPrice: 21
    //excludeContracts: Migrations.sol
  },
  networks: {
    ganache: {
      url: "http://172.24.16.1:8545",
      // accounts: [privateKey1, privateKey2, ...]
    },
    mumbai: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
