import classes from './EventCard.module.css';

import { useNavigate } from 'react-router-dom';

import Button from "./Button";

const EventCard = (props) => {
    const navigate = useNavigate();

    const singleEventHandler = () => {
        console.log(props.type);

        if(props.type === 'organiser'){
            navigate(`/hosted-events/${props.id}`);
            
        }else if(props.type === 'participant'){

            navigate(`/participated-events/${props.id}`);
        }
    };
    
    // 12RMG6m-K3ZmSX0OErfbmrSBpWgbElixq
    return <div className= {classes.card}>
        <h1>{props.name}</h1>
        <img src = 'https://drive.google.com/uc?export=view&id=12RMG6m-K3ZmSX0OErfbmrSBpWgbElixq'/>
        <h2>{props.numJoined}/{props.capacity} People Joined</h2>
        <Button classes = {`${classes.btn}`} onClick = {singleEventHandler}>Know More</Button>
    </div>
}

export default EventCard;