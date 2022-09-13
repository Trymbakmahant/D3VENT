import React from "react";
import Slider from "react-slick";

import classes from './Slick.module.css';

const Slick = () =>  {
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    }

    return (
      <div className= {classes.slick}>
        <h1>Hello 👋🏼</h1>
        <h2>Welcome to D3VENT</h2>
        <Slider {...settings}>
          <div>
            <img src = "Flag.jpg" />
          </div>
          <div>
            <img src = "Flag.jpg" />
          </div>
          <div>
            <img src = "Flag.jpg" />
          </div>
          <div>
            <img src = "Flag.jpg" />
          </div>
          <div>
            <img src = "Flag.jpg" />
          </div>
          <div>
            <img src = "Flag.jpg" />
          </div>
        </Slider>
      </div>
    );
  }

  export default Slick;