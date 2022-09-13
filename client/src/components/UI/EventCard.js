import classes from './EventCard.module.css';

import { useNavigate } from 'react-router-dom';

import Button from "./Button";

const EventCard = (props) => {
    const navigate = useNavigate();

    const singleEventHandler = () => {
        navigate(`/hosted-events/${props.id}`);
    };

    return <div className= {classes.card}>
        <h1>{props.name}</h1>
        <img src = '/sample.png' />
        <h2>{props.numJoined}/{props.capacity} People Joined</h2>
        <Button classes = {`${classes.btn}`} onClick = {singleEventHandler}>Know More</Button>
    </div>
}

export default EventCard;