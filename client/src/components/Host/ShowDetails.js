import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AddressContext";

import classes from './ShowDetails.module.css';

const ShowDetails = (props) => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const showPlaybackHandler = () => {
        navigate(`/events/${props.eventId}/${ctx.sharedState.streamKey.playbackId}`);
    }

    return (
        <> 
        {ctx.sharedState.showStreamKey &&
            <div className={`alert alert-success shadow-lg ${classes.alert}`}>
                 <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                <h3 className="font-bold">Stream key is: {ctx.sharedState.streamKey.currentKey}</h3>
                <div className="text-xs">Stream url is: {ctx.sharedState.streamKey.ingestUrl}</div>
            </div>
        </div>
        <div className="flex-none">
            <button className="btn btn-sm" onClick={showPlaybackHandler}>Let's go</button>
        </div>
        </div>
        }
        </>
    )
};

export default ShowDetails;