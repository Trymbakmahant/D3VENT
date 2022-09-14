import { useContext } from "react";

import Button from "../UI/Button";
import { AppContext } from "../context/AddressContext";

const Live = () =>{
    const ctx = useContext(AppContext);
    
    const goLiveHandler = async () => {
      const response = await fetch('https://livepeer.studio/api/stream/bf15205b-ed1f-4911-91ee-5b6447ae3ccb', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 300b138b-5f81-4e7f-9426-fa5b898d4374'
        }
      })
      const data = await response.json();


      ctx.sharedState.canGoLive(data.streamKey, data.playbackId);
    };


    return (
        <div>
            <Button classes = 'btn-error btn-wide' onClick = {goLiveHandler}>
                <i class="fa-regular fa-signal-stream fa-2x"></i>&nbsp; Go Live
            </Button>
        </div>
    )
};

export default Live;