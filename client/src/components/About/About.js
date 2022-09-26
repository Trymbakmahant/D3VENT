import React from 'react'
import classes from './About.module.css'

const About = () => {
  return (
    <div>
      <h1 className={classes.dvideo}> Demonstration video </h1>
      <div className={classes.ddvideo}>
        <iframe
          width='700'
          height='400'
          src='https://www.youtube.com/embed/S7E4hL9lU64'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}
export default About
