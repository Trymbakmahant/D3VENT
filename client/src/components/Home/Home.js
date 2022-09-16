import { useContext } from "react";
import { AppContext } from "../context/AddressContext"; 

import WORLDIDwidget from "../Home/WorldIDwidget";
import Slick from './Slick';
import EventSlides from "./EventSlides";

const Home = () => {
  const ctx = useContext(AppContext);

  let allEvents = ctx.sharedState.allEvents;

  if(allEvents){
    allEvents = allEvents.slice(allEvents.length - 3, allEvents.length);

  }


  return (
    <div>
      { ctx.sharedState.allEvents ?
        <div>
          <WORLDIDwidget />
          <Slick />
          <EventSlides heading = "Upcoming Events" eventList = {allEvents}/>
      </div> : <></>
      }
    </div>
  );
};

export default Home;
