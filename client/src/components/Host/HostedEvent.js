import { useParams } from "react-router-dom";

import ShowDetails from "./ShowDetails";
import Live from "../Live/Live";

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
      eventId: 2,
      price: "1 Ether",
      capacity: 500,
      numJoined: 96,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy event3",
      eventId: 3,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy even4",
      eventId: 4,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    },
    {
      name: "Dummy even5",
      eventId: 5,
      price: "1 Ether",
      capacity: 500,
      numJoined: 100,
      date: "1-10-2022",
      time: "10 AM",
    }
  ];

const HostedEvent = () =>{

    let {id} = useParams();

    let event = DUMMY_HOSTED.filter((singleEvent) => singleEvent.eventId == id);

    event = event[0];


    return <div>
            <h1>{event.name}</h1>
            <h2>{event.price}</h2>
            <h2>{event.numJoined}/{event.capacity} people Joined</h2>
            <h2>Date: {event.date}</h2>
            <h2>Time: {event.time}</h2>
            <Live eventId = {id}/>
           <ShowDetails />
    </div>
};

export default HostedEvent;