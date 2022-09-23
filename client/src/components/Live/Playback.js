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
      {showAd ? <img src = "https://drive.google.com/uc?export=view&id=12RMG6m-K3ZmSX0OErfbmrSBpWgbElixq" width="270px" height= "100%"></img> : <AdvertisementForm showAd = {showAdHandler}/>}
    </div>
  );
};

export default Playback;
