import EventCard from "../UI/EventCard";

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

const HostedEvents = () => {


  return (
    <div className="grid grid-cols-3">
      {DUMMY_HOSTED.map((event) => (
        <EventCard key={event.eventId} id = {event.eventId} name={event.name} price={event.price} capacity = {event.capacity} 
        numJoined = {event.numJoined} date = {event.date} time = {event.time}/>
      ))}
    </div>
  );
};

export default HostedEvents;
