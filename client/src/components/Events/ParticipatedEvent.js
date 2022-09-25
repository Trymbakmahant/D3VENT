import classes from './ParticipatedEvent.module.css';

import { useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";

import { useContext, useState } from "react";
import { AppContext } from "../context/AddressContext";

import EventDetails from "./EventDetails";

const ParticipatedEvent = () => {
  const [isJoinedEvent, setIsJoinedEvent] = useState(false);
  const [isEventStarted, setIsEventStarted] = useState(true);

    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    let {id} = useParams();

    let isJoined;
    const checkIsJoined = async () => {
      isJoined = await ctx.sharedState.isEventJoined(id);
      setIsJoinedEvent(isJoined);
    }

    checkIsJoined();


    const joinEventHandler = () => {
      id = +id;
      ctx.sharedState.joinEvent(id);
    }

    const joinLiveHandler = async () => {
      const singleEvent  = await ctx.sharedState.getSingleEvent(id);
       let eventDate = Number(singleEvent.dateTime);

       eventDate = new Date(eventDate);

       eventDate = eventDate.toString();
       eventDate = eventDate.substr(0, 18);

       let currentDate = new Date();
       currentDate = currentDate.toString();
       currentDate = currentDate.substr(0, 18);

      if(singleEvent.isJoinable){
        if(eventDate === currentDate){
          if((singleEvent.playbackUri.length)>0){
            const singleEvent = await ctx.sharedState.getSingleEvent(id);
            navigate(`/events/${id}/${singleEvent.playbackUri}`);
          }else{setIsEventStarted(false)}
        }else{setIsEventStarted(false)}
      }else{
        setIsEventStarted(false);
      }

      setInterval(() => {
          setIsEventStarted(true);
      }, 5000);
    }
    
    return <div>
    {!isEventStarted &&  <div className={`alert alert-error shadow-lg ${classes.error}`}>
       <div>
         <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <span>Either event is not started yet, or is already ended!!!</span>
       </div>
     </div>} 
        <EventDetails />  
      {isJoinedEvent 
        ? <Button classes = {`btn-primary btn-wide ${classes.button}`} onClick = {joinLiveHandler}>Watch Live</Button>
        : <Button classes = {`btn-primary btn-wide ${classes.button}`} onClick = {joinEventHandler}>Join</Button>}
        </div>

};

export default ParticipatedEvent;