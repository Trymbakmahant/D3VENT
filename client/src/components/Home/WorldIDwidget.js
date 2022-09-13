import { WorldIDWidget } from "@worldcoin/id";
const WroldCoinUse = () => {
  return (
    <div style = {{margin: "2%"}}>
      {" "}
      <WorldIDWidget
        actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
        signal="0x861715cD400524D279Df4240a99f3C0E22b1c562"
        enableTelemetry
        onSuccess={(verificationResponse) => console.log(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default WroldCoinUse;
