import { useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";

import { useContext, useState } from "react";
import { AppContext } from "../context/AddressContext";

const DUMMY_HOSTED = [
    {
      name: "Dummy event",
      eventId: 1,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy event2",
      eventId: 7,
      price: "1 Ether",
      capacity: 500,
      numJoined: 96,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy event3",
      eventId: 8,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy even4",
      eventId: 9,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy even5",
      eventId: 10,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    }
  ];

const ParticipatedEvent = () => {
    const [isEventStarted, setIsEventStarted] = useState(true);

    const {id} = useParams();
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    let event = DUMMY_HOSTED.filter((singleEvent) => singleEvent.eventId == id);

    event = event[0];

    const joinEventHandler = () => {
        if(ctx.sharedState.streamKey.playbackId.length !== 0 ){
            setIsEventStarted(true);
            navigate(`/events/${ctx.sharedState.streamKey.playbackId}`);
        }else{
            setIsEventStarted(false);
        }
    }

    return <div>
    <h1>{event.name}</h1>
    <h2>{event.price}</h2>
    <h2>{event.numJoined}/{event.capacity} people Joined</h2>
    <h2>Date: {event.date}</h2>
    <h2>Time: {event.time}</h2>
    <Button classes = 'btn-primary' onClick = {joinEventHandler}>Join</Button>
    {!isEventStarted && <h1>Event is not started yet!</h1>}
    </div>
};

export default ParticipatedEvent;