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
      console.log(typeof(id));
      ctx.sharedState.joinEvent(id);
    }

    const joinLiveHandler = async () => {
      const singleEvent  = await ctx.sharedState.getSingleEvent(id);
       let eventDate = Number(singleEvent.dateTime);

       eventDate = new Date(eventDate);

       eventDate = eventDate.toString();
       eventDate = eventDate.substr(0, 15);

       let currentDate = new Date();
       currentDate = currentDate.toString();
       currentDate = currentDate.substr(0, 15);

      console.log(singleEvent.isJoinable);       

      if(singleEvent.isJoinable){
        if(eventDate === currentDate){
          if((singleEvent.playbackUri.length)>0){
            const singleEvent = await ctx.sharedState.getSingleEvent(id);
            await ctx.sharedState.updateSubscription(Number(singleEvent.sfIndexId), ctx.sharedState.accountAddress, 500);
            navigate(`/events/${singleEvent.playbackUri}`);
          }
        }
      }else{
        setIsEventStarted(false);
      }
    }
    
    return <div>
        <EventDetails />
      {isJoinedEvent 
        ? <Button classes = {`btn-primary btn-wide ${classes.button}`} onClick = {joinLiveHandler}>Watch Live</Button>
        : <Button classes = {`btn-primary btn-wide ${classes.button}`} onClick = {joinEventHandler}>Join</Button>}
       {!isEventStarted &&  <h1>Event is not started yet!!</h1>} 
        </div>

};

export default ParticipatedEvent;