import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useContext } from "react";
import { AppContext } from "../context/AddressContext";

import classes from "./Slick.module.css";

const Slick = () => {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const ctx = useContext(AppContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  


  return (
    <div>
    {ctx.sharedState.allEvents !== undefined ? 
      <div className={classes.slick}>
      <h1>Hello 👋🏼</h1>
      <h2>Welcome to D3VENT</h2>
      <Slider {...settings}>
      <div>
      <img src={ctx.sharedState.allEvents[4].uri} />
      </div>
          <div>
            <img src={ctx.sharedState.allEvents[0].uri} />
          </div>
          <div>
            <img src={ctx.sharedState.allEvents[1].uri} />
            </div>
          <div>
            <img src={ctx.sharedState.allEvents[2].uri} />
          </div>
          <div>
            <img src={ctx.sharedState.allEvents[3].uri} />
          </div>
          </Slider>
          </div>
          : <></>  }
    </div>
  );

};

export default Slick;
