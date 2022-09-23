export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://eth-goerli.g.alchemy.com/v2/dfheQ162dYpO_08RovchBTtGCe8oVAWA";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
