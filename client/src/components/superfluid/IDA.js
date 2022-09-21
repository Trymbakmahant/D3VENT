import React, { useState } from "react";
import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Spinner, Form, FormGroup, FormControl } from "react-bootstrap";
import "./createFlow.css";

//id is a number randomly generated between 1 and a billion
const id = Math.floor(Math.random() * 1000000000);

//where the Superfluid logic takes place
//where the Superfluid logic takes place

const DAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

const updateSubscription = async (id, address, shares) => {
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
  });
  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider,
  });
  try {
    const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
      indexId: id,
      superToken: DAIx,
      subscriber: address,
      units: shares,
      // userData?: string
    });

    console.log("Updating your Index...");

    await updateSubscriptionOperation.exec(signer);

    console.log(
      `Congrats - you've just updated an Index!
         Network: Goerli
         Super Token: DAIx
         Index ID: ${id}
         Subscriber: ${address}
         Units: ${shares} units
         
      `
    );
  } catch (error) {
    console.error(error);
  }
};
const createIndex = async (indexId) => {
  const sf = await Framework.create({
    chainId: 5,
    provider: customHttpProvider,
  });
  const signer = sf.createSigner({
    privateKey:
      "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider,
  });
  try {
    const createIndexOperation = sf.idaV1.createIndex({
      indexId: id,
      superToken: DAIx,
      // userData?: string
    });

    console.log("Creating your Index...");

    await createIndexOperation.exec(signer);

    console.log(
      `Congrats - you've just created a new Index!
       Network: Goerli
       Super Token: DAIx
       Index ID: ${id}
    `
    );
  } catch (error) {
    console.error(error);
  }
};

export const CreateIndex = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const [id, setId] = useState("");
  const [subscriber, setSubscriber] = useState("");
  const [units, setUnits] = useState("");
  const [isButtonLoading1, setIsButtonLoading1] = useState(false);

  function UpdateSubButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading1 ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleIdChange = (e) => {
    setId(() => ([e.target.name] = e.target.value));
  };

  const handleSubscriberChange = (e) => {
    setSubscriber(() => ([e.target.name] = e.target.value));
  };

  const handleUnitsChange = (e) => {
    setUnits(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <h2>Create a New Index</h2>

      <CreateButton
        onClick={() => {
          setIsButtonLoading(true);
          createIndex(id);
          setTimeout(() => {
            setIsButtonLoading(false);
          }, 1000);
        }}
      >
        Click to Create Your Index
      </CreateButton>

      <h1>For the event to add the event listener</h1>

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
            name="subscriber"
            value={subscriber}
            onChange={handleSubscriberChange}
            placeholder="Enter subscriber address"
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            name="units"
            value={units}
            onChange={handleUnitsChange}
            placeholder="Enter the number of shares to give subscriber"
          ></FormControl>
        </FormGroup>
        <UpdateSubButton
          onClick={() => {
            setIsButtonLoading1(true);
            updateSubscription(id, subscriber, units);
            setTimeout(() => {
              setIsButtonLoading1(false);
            }, 1000);
          }}
        >
          Click to Update Your Index
        </UpdateSubButton>
      </Form>
    </div>
  );
};
