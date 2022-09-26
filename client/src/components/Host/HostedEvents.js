import EventCard from "../UI/EventCard";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AddressContext";


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
