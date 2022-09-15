import { useContext, useState } from "react";

import Button from "../UI/Button";
import { AppContext } from "../context/AddressContext";

const Live = (props) =>{
    const [isWrongDate, setIsWrongDate] = useState(false);

    const ctx = useContext(AppContext);
    
    const goLiveHandler = async () => {

        const event = await ctx.sharedState.getSingleEvent(5);  //pass props.eventId later here

        let eventDate = Number(event.dateTime);
        eventDate = new Date(eventDate).toString();
        eventDate = eventDate.substr(0, 18);

        let currentDate = new Date().toString();
        currentDate = currentDate.substr(0, 18);
        
        if(currentDate === eventDate){
            ctx.sharedState.setEventIsJoinable(props.eventId, true);

            const response = await fetch('https://livepeer.studio/api/stream/bf15205b-ed1f-4911-91ee-5b6447ae3ccb', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 300b138b-5f81-4e7f-9426-fa5b898d4374'
                }
            })
            const data = await response.json();
                
            ctx.sharedState.canGoLive(data.streamKey, data.playbackId);
        }   else {
            setIsWrongDate(true);
        }
    };


    return (
        <div>
            <Button classes = 'btn-error btn-wide' onClick = {goLiveHandler}>
                <i class="fa-regular fa-signal-stream fa-2x"></i>&nbsp; Go Live
            </Button>
            {isWrongDate && <h1>Can't go Live now. Either you are trying to go live before or after the event date and time.</h1>}
        </div>
    )
};

export default Live;