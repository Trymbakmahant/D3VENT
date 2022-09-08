const NETWORKS_LOOKUP = new Map([
    ["1", "Ethereum"],
    ["3", "Ropsten"],
    ["4", "Tinkeyby"],    
    ["5", "Goerli"],
    ["2a", "Kovan"],
    ["42", "Kovan"],
    ["137", "Polygon"],
    ["31337", "Hardhat"],
    ["80001", "Mumbai"]
]);

const TARGET_NETWORK = "80001"; // Mumbai
const MUMBAI_SCAN_STUB = "https://mumbai.polygonscan.com/address/"
const POLYGON_SCAN_STUB = "https://polyscan.com/"

module.exports = {
    NETWORKS_LOOKUP,
    TARGET_NETWORK,
    MUMBAI_SCAN_STUB,
    POLYGON_SCAN_STUB
}
