export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://eth-goerli.alchemyapi.io/v2/zfWv3pEito9Wi7gDUSLsand11To5VEjN";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
