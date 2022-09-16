import EventCard from '../UI/EventCard';

import classes from './EventSlides.module.css';

const EventSlides = (props) => {

    return (
        <div className= {classes.slides}>
            <h3>{props.heading}</h3>
            <div className={`grid grid-cols-3`}>
                {props.eventList.map((event) => <EventCard key={Number(event.id)} id = {Number(event.id)} name={event.name}
                numJoined = {Number(event.numJoined)} date = {Number(event.dateTime)} thumbnail = {event.uri} type = "none"/>)}
            </div>
        </div>
    )
};


export default EventSlides;