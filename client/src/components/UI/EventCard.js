import classes from './EventCard.module.css';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AddressContext';

import Button from "./Button";

const EventCard = (props) => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const singleEventHandler = async () => {

        if(props.type === 'organiser'){
            navigate(`/hosted-events/${props.id}`);
            
        }else if(props.type === 'participant'){

            navigate(`/participated-events/${props.id}`);
        }else{
            const singleEvent = await ctx.sharedState.getSingleEvent(props.id);
            if(singleEvent.organiser === ctx.sharedState.accountAddress){
                navigate(`/hosted-events/${props.id}`);
            }else{
                navigate(`/participated-events/${props.id}`);
            }
        }
    };

    // return <div className= {classes.card}>
    //     <h1>{props.name}</h1>
    //     <img src = {props.thumbnail}/>
    //     <h2>{props.numJoined} People Joined</h2>
    //    
    // </div>

    return <div className= {classes.card}>
        <img src = {props.thumbnail} />
    <div className= {`${classes.cardOverlay}`}>
        <div>
            <h1 className= {classes.cardHeader}>{props.name}</h1>
            <h2 className= {classes.numJoined}>{props.numJoined} People Joined</h2>
        </div>
        <div className= {classes.btn}>
            <Button onClick = {singleEventHandler}>Know More</Button>
        </div>
    </div>
    </div>
}

export default EventCard;