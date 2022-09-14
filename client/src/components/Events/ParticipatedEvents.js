import EventCard from '../UI/EventCard';

import { useContext } from 'react';
import { AppContext } from '../context/AddressContext';

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

const ParticipatedEvents = () => {
  const ctx = useContext(AppContext);

    ctx.sharedState.getUserEvents();

    return (
        <div className="grid grid-cols-3">
          {DUMMY_HOSTED.map((event) => (
            <EventCard key={event.eventId} id = {event.eventId} name={event.name} price={event.price} capacity = {event.capacity} 
            numJoined = {event.numJoined} date = {event.date} time = {event.time} type = "participant"/>
          ))}
        </div>
    )
};

export default ParticipatedEvents;