import { useContext } from "react";
import { AppContext } from "../context/AddressContext"; 

import WORLDIDwidget from "../Home/WorldIDwidget";
import Slick from "./Slick";
import { CreateFlow } from "../superfluid/createflow";
import { DeleteFlow } from "../superfluid/DeleteFlow";
import { CreateIndex } from "../superfluid/IDA";
import { DistributeFunds } from "../superfluid/distribution";
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
    <button onClick = {() => {navigate('/events/cc73p82f6f19or2s')}}>Click</button>
    { ctx.sharedState.allEvents ?
      <div>
        <WORLDIDwidget />
        <Slick />
        <EventSlides heading = "Upcoming Events" eventList = {allEvents}/>
    </div> : <></>
    }
      <CreateIndex />
      <h1> For the distribution</h1>
      <DistributeFunds />
      {/* <CreateFlow />
      <DeleteFlow /> */}
    </div>
  );
};

export default Home;
