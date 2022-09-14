import {Routes, Route} from "react-router-dom";

import Home from "../components/Home/Home";
import YourEvents from "../components/Events/YourEvents";
import Host from "../components/Host/Host";
import Live from "../components/Live/Live";
import HostedEvents from "../components/Host/HostedEvents";
import HostedEvent from "../components/Host/HostedEvent";
import Playback from "../components/Live/Playback";
import ParticipatedEvents from "../components/Events/ParticipatedEvents";
import ParticipatedEvent from "../components/Events/ParticipatedEvent";

const Paths = () => {
    return (
        <Routes>
            <Route path= "/" element = {<Home />} />
            <Route path = "/your-events" element = {<YourEvents />} />
            <Route path = "/host" element = {<Host />} />
            <Route path = "/live" element = {<Live />} />
            <Route path = "/hosted-events" element = {<HostedEvents />} />
            <Route path = "/hosted-events/:id" element = {<HostedEvent />} />
            <Route path = "/events/:playbackId" element = {<Playback />} />
            <Route path = "/participated-events" element = {<ParticipatedEvents />}/>
            <Route path = "/participated-events/:id" element = {<ParticipatedEvent />} />
        </Routes>
    )
};

export default Paths;