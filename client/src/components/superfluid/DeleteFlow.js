import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./createFlow.css";

//where the Superfluid logic takes place
async function deleteFlow(recipient) {
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
  });

  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721",
      receiver: recipient,
      superToken: DAIx,
      // userData?: string
    });

    console.log("Deleting your stream...");

    await deleteFlowOperation.exec(signer);

    console.log(
      `Congrats - you've just deleted your money stream!
       Network: Kovan
       Super Token: DAIx
       Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
       Receiver: ${recipient}
    `
    );
  } catch (error) {
    console.error(error);
  }
}

export const DeleteFlow = () => {
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function DeleteButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Delete a Flow</h2>
      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            placeholder="Enter your Ethereum address"
          ></FormControl>
        </FormGroup>
        {/* <Button onClick={() => deleteFlow(recipient)}> */}
        <DeleteButton
          onClick={() => {
            setIsButtonLoading(true);
            deleteFlow(recipient);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Delete Your Stream
        </DeleteButton>
      </Form>

      <div className="description">
        <p>
          Go to the DeleteFlow.js component and look at the <b>deleteFlow() </b>
          function to see under the hood
        </p>
      </div>
    </div>
  );
};
