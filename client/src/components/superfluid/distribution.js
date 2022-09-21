import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./createFlow.css";

//where the Superfluid logic takes place
async function distribute(id, amount) {
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider,
  });

  const DAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

  try {
    const distributeOperation = sf.idaV1.distribute({
      indexId: id,
      superToken: DAIx,
      amount: amount,
      // userData?: string
    });

    console.log("Distributing funds to your index subscribers...");

    await distributeOperation.exec(signer);

    console.log(
      `Congrats - you've just sent funds to your index!
       Network: Goerli
       Super Token: DAIx
       Index ID: ${id}
       Total Sent: ${amount}
    `
    );
  } catch (error) {
    console.error(error);
  }
}

export const DistributeFunds = () => {
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function DistributeButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Distribute Funds</h2>
      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="id"
            value={id}
            onChange={handleIdChange}
            placeholder="Enter your index ID"
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter an amount to distribute in wei"
          ></FormControl>
        </FormGroup>
        <DistributeButton
          onClick={() => {
            setIsButtonLoading(true);
            distribute(id, amount);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Distribute Funds to Your Index
        </DistributeButton>
      </Form>
    </div>
  );
};
