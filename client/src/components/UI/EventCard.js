import classes from './EventCard.module.css';

import Button from "./Button";

const EventCard = (props) => {
    return <div className= {classes.card}>
        <h1>{props.name}</h1>
        <img src = '/sample.png' />
        <h2>{props.numJoined}/{props.capacity} People Joined</h2>
        <Button classes = {`${classes.btn}`}>Know More</Button>
    </div>
}

export default EventCard;