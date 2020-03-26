import React, { Dispatch, SetStateAction } from "react";
import s from "./MeetingScreen.module.scss";
interface Props {
  switchOn: Dispatch<SetStateAction<boolean>>;
}

const MeetingScreen = (props: Props) => {
  return (
    <div className={s.MeetingScreen} data-testid="meeting-screen">
      <h3>Welcome in the Game</h3>
      <p>Press start to continue!!!</p>
      <button onClick={() => props.switchOn(true)} data-testid="start-btn">
        Start
      </button>
    </div>
  );
};

export default MeetingScreen;
