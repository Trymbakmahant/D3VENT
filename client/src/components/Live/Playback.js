import { useContext } from "react";

import { AppContext } from "../context/AddressContext";

import classes from "./Playback.module.css";
import AdvertisementForm from "./AdvertisementForm";

const Playback = () => {
  const ctx = useContext(AppContext);
  const flow = 0;

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
      {flow ? "ad" : <AdvertisementForm />}
    </div>
  );
};

export default Playback;
