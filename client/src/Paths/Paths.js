import {Routes, Route} from "react-router-dom";

import Home from "../components/Home/Home";
import YourEvents from "../components/Events/YourEvents";
import Host from "../components/Host/Host";
import Live from "../components/Live/Live";

const Paths = () => {
    return (
        <Routes>
            <Route path= "/" element = {<Home />} />
            <Route path = "/your-events" element = {<YourEvents />} />
            <Route path = "/host" element = {<Host />} />
            <Route path = "/live" element = {<Live />} />
        </Routes>
    )
};

export default Paths;