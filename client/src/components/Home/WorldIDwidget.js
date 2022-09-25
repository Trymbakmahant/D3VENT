import { WorldIDWidget } from "@worldcoin/id";
import { AppContext } from "../context/AddressContext";
import { useContext } from "react";
const WroldCoinUse = () => {
  const ctx = useContext(AppContext);
  return (
    <div style={{ margin: "15% 37%" }}>
      {" "}
      <WorldIDWidget
        actionId="wid_a4c0eed4ad6a1f24aadbcdd4fcb0ccf7" // obtain this from developer.worldcoin.org
        signal={ctx.sharedState.accountAddress}
        enableTelemetry
        onSuccess={(obj) => {
          const { merkle_root, nullifier_hash, proof } = obj;
          ctx.sharedState.provideWorldCoinAddress(
            ctx.sharedState.accountAddress,
            merkle_root,
            nullifier_hash,
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