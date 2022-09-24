import { useContext, useState } from "react";

import { AppContext } from "../context/AddressContext";

import classes from "./Playback.module.css";
import AdvertisementForm from "./AdvertisementForm";

const Playback = () => {
  const [showAd, setShowAd] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const ctx = useContext(AppContext);

  const showAdHandler = (shouldShow) => {
    setShowAd(shouldShow);
  }

  const setUrlHandler = (url) => {
    setImageUrl(url);
  }
  return (
    <div className= {classes.page}>
      <iframe
        className={classes.screen}
        src={`https://lvpr.tv?v=${ctx.sharedState.streamKey.playbackId}`}
        frameborder="0"
        width="75%"
        height="450"
        allowfullscreen
        allow="autoplay; encrypted-media; picture-in-picture"
        sandbox="allow-scripts"
      ></iframe>
      {showAd ? <img src = {imageUrl} width="270px" height= "100%"></img> : <AdvertisementForm showAd = {showAdHandler} imageUrl = {setUrlHandler}/>}
    </div>
  );
};

export default Playback;
