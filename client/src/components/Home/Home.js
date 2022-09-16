import WORLDIDwidget from "../Home/WorldIDwidget";
import Slick from "./Slick";
import { CreateFlow } from "../superfluid/createflow";
import { DeleteFlow } from "../superfluid/DeleteFlow";
const Home = () => {
  return (
    <div>
      <WORLDIDwidget />
      <Slick />
      <CreateFlow />
      <DeleteFlow />
    </div>
  );
};

export default Home;
