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

        setInterval(() => {
            setIsWrongDate(false);
        }, 5000);
    };


    return (
        <div>
        {isWrongDate && <div className={`alert alert-error shadow-lg ${classes.error}`}>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Can't go Live now. Either you are trying to go live before or after the live event date.</span>
            </div>
        </div>}
            <Button classes = {`btn-error btn-wide ${classes.adjust}`} onClick = {goLiveHandler}>
                <i class="fa-regular fa-signal-stream fa-2x"></i>&nbsp; Go Live
            </Button>
        </div>
    )
  
}

export default Live
