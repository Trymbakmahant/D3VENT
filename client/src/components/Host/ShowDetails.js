import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AddressContext";

import Button from "../UI/Button";

const ShowDetails = (props) => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const showPlaybackHandler = () => {
        navigate(`/events/${props.eventId}/${ctx.sharedState.streamKey.playbackId}`);
    }

    return (
        <> 
        {ctx.sharedState.showStreamKey &&
            <div>
            <h1>Stream key is: {ctx.sharedState.streamKey.currentKey}</h1>
            <h1>Stream url is: {ctx.sharedState.streamKey.ingestUrl}</h1>
            <Button classes = 'btn-primary' onClick = {showPlaybackHandler}>Done</Button>
            </div>
        }
        </>
    )
};

export default ShowDetails;