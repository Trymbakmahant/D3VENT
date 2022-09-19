import WORLDIDwidget from "../Home/WorldIDwidget";
import Slick from "./Slick";
import { CreateFlow } from "../superfluid/createflow";
import { DeleteFlow } from "../superfluid/DeleteFlow";
import { CreateIndex } from "../superfluid/IDA";
import { DistributeFunds } from "../superfluid/distribution";
const Home = () => {
  return (
    <div>
      <WORLDIDwidget />
      <Slick />
      <CreateIndex />
      <h1> For the distribution</h1>
      <DistributeFunds />
      {/* <CreateFlow />
      <DeleteFlow /> */}
    </div>
  );
};

export default Home;
