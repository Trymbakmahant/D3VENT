import { WorldIDWidget } from "@worldcoin/id";
import { AppContext } from "../context/AddressContext";
import { useContext } from "react";
const WroldCoinUse = () => {
  const ctx = useContext(AppContext);
  return (
    <div style = {{margin: "2%"}}>
      {" "}
      <WorldIDWidget
        actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
        signal={ctx.sharedState.accountAddress}
        enableTelemetry
        onSuccess={(obj) => {
          const { root, nullifierHash, proof } = obj;
          ctx.sharedState.provideWorldCoinAddress(
            ctx.sharedState.accountAddress,
            root,
            nullifierHash,
            proof
          );
          console.log(obj);
        }} // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default WroldCoinUse;
