import EventCard from '../UI/EventCard';
import { useNavigate } from 'react-router-dom';

import classes from './EventSlides.module.css';

const EventSlides = (props) => {
    const navigate = useNavigate();

    const goToAllEventsHandler = () => {
        navigate('/all-events');
    }

    return (
        <div className= {classes.slides}>
            <div>
            <h3>{props.heading} {props.showAll ? <span onClick = {goToAllEventsHandler}><i className="fa-solid fa-arrow-right"></i></span> : ""}</h3>
            </div>
            <div className={`grid grid-cols-3`}>
                {props.eventList.map((event) => <EventCard key={Number(event.id)} id = {Number(event.id)} name={event.name}
                numJoined = {Number(event.numJoined)} date = {Number(event.dateTime)} thumbnail = {event.uri} type = "none"/>)}
            </div>
        </div>
    )
};


export default EventSlides;