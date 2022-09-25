import { useContext } from "react";
import { AppContext } from "../context/AddressContext";


import EventCard from "../UI/EventCard";

const AllEvents = () => {
    const ctx = useContext(AppContext);

    window.scrollTo(0,0);

    let allEvents = ctx.sharedState.allEvents;


    return <div>
        {ctx.sharedState.allEvents 
            ? 
            <div>
                <h1 style = {{"textAlign": "center", "fontSize": "3rem", "margin": "4% auto"}}>All Events</h1>
                <div className={`grid grid-cols-3`}>
                    {allEvents.map((event) => <EventCard key={Number(event.id)} id = {Number(event.id)} name={event.name}
                    numJoined = {Number(event.numJoined)} date = {Number(event.dateTime)} thumbnail = {event.uri} type = "none"/>)}
                </div>
            </div>
            : <></>
        }

    </div>
};

export default AllEvents;