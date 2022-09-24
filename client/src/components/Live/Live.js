import classes from "./Live.module.css";

import { useContext, useState } from "react";
import Button from '../UI/Button'
import { AppContext } from '../context/AddressContext'

const Live = (props) =>{
    const [isWrongDate, setIsWrongDate] = useState(false);

    const ctx = useContext(AppContext);
    
    const goLiveHandler = async () => {

        const event = await ctx.sharedState.getSingleEvent(props.eventId);  //pass props.eventId later here

        let eventDate = Number(event.dateTime);
        eventDate = new Date(eventDate).toString();
        eventDate = eventDate.substr(0, 18);

        let currentDate = new Date().toString();
        currentDate = currentDate.substr(0, 18);
        console.log(eventDate);
        if(currentDate === eventDate){
            ctx.sharedState.setEventIsJoinable(props.eventId, true);

            const response = await fetch('https://livepeer.studio/api/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_LIVEPEER_API_KEY}`
                },
                body:JSON.stringify({
                    "name": `${event.name}${Number(event.id)}`
                })
            })
            const data = await response.json();
                
            ctx.sharedState.canGoLive(data.streamKey, data.playbackId, props.eventId);
        }   else {
            setIsWrongDate(true);
        }
    };


    return (
        <div>
            <Button classes = {`btn-error btn-wide ${classes.adjust}`} onClick = {goLiveHandler}>
                <i class="fa-regular fa-signal-stream fa-2x"></i>&nbsp; Go Live
            </Button>
            {isWrongDate && <h1 className= {classes.error}>Can't go Live now. Either you are trying to go live before or after the event date and time.</h1>}
        </div>
    )
  
}

export default Live
