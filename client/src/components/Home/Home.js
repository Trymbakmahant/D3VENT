import { useContext } from "react";
import { AppContext } from "../context/AddressContext"; 

import Slick from "./Slick";
import EventSlides from "./EventSlides";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);

  let allEvents = ctx.sharedState.allEvents;
  let upcomingEvents;
  if(allEvents){
    upcomingEvents = allEvents.slice(allEvents.length - 3, allEvents.length);

  }


  return (
    <div>
    { ctx.sharedState.allEvents ?
      <div>
        <Slick />
        <EventSlides heading = "Upcoming Events" eventList = {upcomingEvents}/>
        <EventSlides heading = "All Events" eventList = {upcomingEvents} showAll = {true}/>
    </div> : <></>
    }
    <Footer />
    </div>
  );
};

export default Home;
