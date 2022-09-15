import classes from "./HostedEvent.module.css";

import { useParams } from "react-router-dom";

import ShowDetails from "./ShowDetails";
import Live from "../Live/Live";

import { useContext } from "react";
import { AppContext } from "../context/AddressContext";

const HostedEvent = () => {
  const ctx = useContext(AppContext);
  let { id } = useParams();

  const eventList = ctx.sharedState.allEvents;

  let event = eventList.filter((singleEvent) => Number(singleEvent.id) == id);

  let dateValue = new Date(Number(event[0].dateTime));

  dateValue = dateValue.toString();

  const date = dateValue.substr(0, 15);
  let time = dateValue.split(" ")[4];

  time = time.substr(0, 2);

  const NumberTime = +time;

  if (NumberTime > 12) {
    NumberTime -= 12;
    time = NumberTime.toString() + " PM";
  } else {
    time = time + " AM";
  }

  return (
    <div className={classes.knowmore}>
      <h1 className={classes.title}>{event[0].name}</h1>
      <img src={event[0].uri} alt="event image" />
      <div className= {classes.details}>
        <div>
          <h2>{Number(event[0].numJoined)} people Joined</h2>
        </div>
        <div>
          <h2>Date: {date}</h2>
          <h2>At: {time}</h2>
        </div>
      </div>
      <Live />
      <ShowDetails />
    </div>
  );
};

export default HostedEvent;
