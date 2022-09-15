import { useEffect, useContext } from "react";
import { AppContext } from "../context/AddressContext"; 

import WORLDIDwidget from "../Home/WorldIDwidget";
import Slick from './Slick';
const Home = () => {
  const ctx = useContext(AppContext);


  return (
    <div>
      <WORLDIDwidget />
      <Slick />
    </div>
  );
};

export default Home;
