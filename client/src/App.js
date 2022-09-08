import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import Navbar from "./components/Navbar/Navbar";
import Paths from "./Paths/Paths";

function App() {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });


  return (
    <WagmiConfig client = {wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <Paths />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
