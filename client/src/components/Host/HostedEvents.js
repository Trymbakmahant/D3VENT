import EventCard from "../UI/EventCard";

import { useContext, useEffect, useState } from "react";
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
  const [hostedEvents, setHostedEvents] = useState([]);
  const ctx = useContext(AppContext);
  let hostedEventsArray = [];

  
      useEffect(() => {
        const getEvents = async () => {
    
          const organisedEventIds = await ctx.sharedState.getOrganisedEvents();
    
          const allEvents = ctx.sharedState.allEvents;
          
          
          for(let i =0; i<organisedEventIds.length; i++){
            for(let j =0; j<allEvents.length; j++){
              if(organisedEventIds[i] === Number(allEvents[j].id)){
                hostedEventsArray.push(allEvents[j]);
                break;
              }
            }

          }
        }

        getEvents().then(() => { 
          setHostedEvents(hostedEventsArray)
        }
        )
        }, []); 
    
  
        

  return (
    <div>
     {hostedEvents.length > 0  && <div className="grid grid-cols-3">
    {hostedEvents.map((event) => (
      <EventCard key={Number(event.id)} id = {Number(event.id)} name={event.name}
      numJoined = {Number(event.numJoined)} date = {Number(event.dateTime)} thumbnail = {event.uri} type = "organiser"/>
      ))}
      </div>}
      </div>
      )
  ;
};

export default HostedEvents;
