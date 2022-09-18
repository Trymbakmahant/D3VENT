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

    // 12RMG6m-K3ZmSX0OErfbmrSBpWgbElixq
    return <div className= {classes.card}>
        <h1>{props.name}</h1>
        <img src = {props.thumbnail}/>
        <h2>{props.numJoined} People Joined</h2>
        <Button classes = {`${classes.btn}`} onClick = {singleEventHandler}>Know More</Button>
    </div>
}

export default EventCard;