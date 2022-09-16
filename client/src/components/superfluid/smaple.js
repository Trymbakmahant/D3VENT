async function doThing2() {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const contractAddress = document.getElementById("contractAddress").value
  
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(contractAddress, abi, signer);
  
        var signal = document.getElementById("input2").value
        var root = ethers.BigNumber.from(document.getElementById("input3").value)
        var nullifier = ethers.BigNumber.from(document.getElementById("input4").value)
        var proof = document.getElementById("input5").value
        var outputBox = document.getElementById("output2")
  
        const unpackedProof = ethers.utils.defaultAbiCoder.decode(["uint256[8]"], proof)[0];
        console.log(unpackedProof)
        console.log("/proof")
  
        outputBox.value = ""
  
        try{
          outputBox.value = await connectedContract.verifyAndExecute(signal, root, nullifier, unpackedProof,{ gasLimit: 600000 });
          //outputBox.value = await connectedContract.verifyAndExecute(signal, root, nullifier, unpackedProof);
          console.log("result: ", outputBox.value);
        }
        catch (error) {
          console.log(error)
          outputBox.value = "error"
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }