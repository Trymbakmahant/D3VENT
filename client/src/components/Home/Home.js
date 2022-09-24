import { useContext } from "react";
import { AppContext } from "../context/AddressContext"; 

import Slick from "./Slick";
import EventSlides from "./EventSlides";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);

  let allEvents = ctx.sharedState.allEvents;

  if(allEvents){
    allEvents = allEvents.slice(allEvents.length - 3, allEvents.length);

  }


  return (
    <div>
    { ctx.sharedState.allEvents ?
      <div>
        <Slick />
        <EventSlides heading = "Upcoming Events" eventList = {allEvents}/>
    </div> : <></>
    }
    </div>
  );
};

export default Home;
