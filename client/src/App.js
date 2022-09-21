import Navbar from './components/Navbar/Navbar'
import Paths from './Paths/Paths'
import { useContext, useState } from 'react';
import { AppContext } from './components/context/AddressContext';

import WORLDIDwidget from "./components/Home/WorldIDwidget";
function App() {
  const [checkIsVerified, setCheckIsVerified] = useState(false);
  const ctx = useContext(AppContext);

  let getValue;
  const getData = async () =>{

    getValue = await ctx.sharedState.checkIsVerified();
    setCheckIsVerified(getValue)
  }

  getData();

  return (
    <>
        <div>
          <Navbar />
          <Paths />
        </div>

    </>
  )
}

export default App
