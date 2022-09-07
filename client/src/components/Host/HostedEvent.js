import Live from "../Live/Live";

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

const HostedEvent = () =>{
    return <div>
    <h1>Yo</h1>
    <Live />
    </div>
};

export default HostedEvent;