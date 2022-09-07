import { useNavigate } from "react-router-dom";

import Button from "../UI/Button";

import classes from "./YourEvents.module.css";

const YourEvents = () => {
    const navigate = useNavigate();

  const redirectToParticipatedEvents = () => {};

  const redirectToHostedEvents = () => {
    navigate('/hosted-events');
  };

  return (
    <div>
      <div className={`flex flex-col border-opacity-50 ${classes.button}`}>
        <Button classes={`btn-outline btn-secondary`} onClick={redirectToParticipatedEvents}>
          Go To Participated Events &nbsp;
          <i className="fa-solid fa-arrow-up-right fa-2x"></i>
        </Button>
        <div className="divider">OR</div>
        <Button classes={`btn-outline btn-secondary`} onClick={redirectToHostedEvents}>
          Go To Hosted Events &nbsp;
          <i className="fa-solid fa-arrow-up-right fa-2x"></i>
        </Button>
      </div>
    </div>
  );
};

export default YourEvents;
