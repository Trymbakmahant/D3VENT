import { WorldIDWidget } from "@worldcoin/id";
import { AppContext } from "../context/AddressContext";
import { useContext } from "react";
import axios from "axios";
const WroldCoinUse = () => {
  const ctx = useContext(AppContext);

  const verifywithcloud = async (obj) => {
    const { merkle_root, nullifier_hash, proof } = obj;
    const alldata = {
      action_id: "wid_9757aa98f27411999dff8622189a6ed9",
      signal: ctx.sharedState.accountAddress,
      proof: proof,
      nullifier_hash: nullifier_hash,
      merkle_root: merkle_root,
    };
    console.log(obj);
    console.log(alldata);
    await axios
      .post("https://developer.worldcoin.org/api/v1/verify", alldata)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ margin: "2%" }}>
      {" "}
      <WorldIDWidget
        actionId="wid_a4c0eed4ad6a1f24aadbcdd4fcb0ccf7" // obtain this from developer.worldcoin.org
        signal={ctx.sharedState.accountAddress}
        enableTelemetry
        onSuccess={(obj) => verifywithcloud(obj)} // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default WroldCoinUse;
