// use an constructorArgs.js file to pass constructor arguments 
// when verifying a contract. can use in run and deploy scripts to keep one source of arguments
// example code below
require("dotenv").config();

const phill =  process.env.phill
const itachi = process.env.itachi
//const try =
//const bhakti =  

module.exports = [
    phill,
    itachi,
];