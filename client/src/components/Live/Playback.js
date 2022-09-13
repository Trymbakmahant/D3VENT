import { useContext } from "react";

import { AppContext } from "../context/AddressContext";

const Playback = () => {
    const ctx = useContext(AppContext);

    return <iframe
    src={`https://lvpr.tv?v=${ctx.sharedState.streamKey.playbackId}`}
    frameborder="0"
    width="80%"
    height="500"
    allowfullscreen
    allow="autoplay; encrypted-media; picture-in-picture"
    sandbox="allow-scripts">
  </iframe>
};

export default Playback;