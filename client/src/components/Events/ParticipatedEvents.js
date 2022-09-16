import EventCard from '../UI/EventCard';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AddressContext';


const ParticipatedEvents = () => {
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const ctx = useContext(AppContext);
  let participatedEventsArray
    
    
    useEffect(() => {

      const getIds = async () => {
        const ids = await ctx.sharedState.getUserEventIds();
        const allEvents = ctx.sharedState.allEvents;
        console.log(allEvents[0].id);
        
        participatedEventsArray = []; 
        
        for(let i =0; i<ids.length; i++){
          for(let j =0; j<allEvents.length; j++){
            if(Number(ids[i]) === (Number(allEvents[j].id))){
              participatedEventsArray.push(allEvents[j]);
              break;
            }
          }
        }
      }
      getIds().then(()=> {
        setParticipatedEvents(participatedEventsArray);
      })
    
  }, []);


    return (
        <div className="grid grid-cols-3">
          {participatedEvents.map((event) => (
            <EventCard key={Number(event.id)} id = {Number(event.id)} name={event.name}
            numJoined = {Number(event.numJoined)} type = "participant"/>
          ))}
        </div>
    )
};

export default ParticipatedEvents;