import React from 'react'

const About = () => {
  return (
    <div>
      <h1 className='dvideo'> Demonstration video </h1>
      <div className='ddvideo'>
        <iframe
          width='700'
          height='400'
          src='https://www.youtube.com/embed/LMqrUIjJbiY'
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
