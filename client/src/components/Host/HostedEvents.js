import { useNavigate } from "react-router-dom";

const DUMMY_HOSTED = [
    {
        name: 'Dummy event',
        eventId: 1,
        price: '1 Ether',
        capacity: 500,
        numJoined: 100,
        date: '1-10-2022',
        time: '10 AM'
    }

]

const HostedEvents = () =>{
    const navigate = useNavigate();

    const redirectToEventHandler = () =>{
        const path = `/hosted-events/${DUMMY_HOSTED[0].eventId}`;
        
        navigate(path);
    };

    return (
        <div onClick={redirectToEventHandler}>
            <h1>{DUMMY_HOSTED[0].name}</h1>
            <h3>{DUMMY_HOSTED[0].price}</h3>
            <h3>{DUMMY_HOSTED[0].numJoined}/{DUMMY_HOSTED[0].capacity} people joined</h3>
            <h3>When: {DUMMY_HOSTED[0].date} at {DUMMY_HOSTED[0].time}</h3>
        </div>
    )
};

export default HostedEvents;