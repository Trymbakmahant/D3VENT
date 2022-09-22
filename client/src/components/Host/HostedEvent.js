import { useParams } from "react-router-dom";

import ShowDetails from "./ShowDetails";
import Live from "../Live/Live";
import EventDetails from "../Events/EventDetails";

const HostedEvent = () => {
  let {id} = useParams();

  return (
    <div>
    <EventDetails />
      <Live eventId = {id}/>
      <ShowDetails eventId = {id}/>
    </div>
  );
};

export default HostedEvent;
