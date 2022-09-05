import {Routes, Route} from "react-router-dom";

import Home from "../components/Home/Home";
import YourEvents from "../components/Events/YourEvents";
import Host from "../components/Host/Host";

const Paths = () => {
    return (
        <Routes>
            <Route path= "/" element = {<Home />} />
            <Route path = "/your-events" element = {<YourEvents />} />
            <Route path = "/host" element = {<Host />} />
        </Routes>
    )
};

export default Paths;