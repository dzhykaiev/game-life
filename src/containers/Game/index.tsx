import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import GameStore from "./Store";
import GameGrid from "../../components/GameGrid";
import ControlPanel from "../ControlPanel";
import MeetingScreen from "../../components/MeetingScreen";

const Game = observer(() => {
  const [ms, setMs] = useState<number>(400);
  const [isTheGameOn, switchOn] = useState<boolean>(false);
  useEffect(() => {
    const effect = setInterval(() => {
      GameStore.tick();
    }, ms);
    return () => {
      clearInterval(effect);
    };
  }, [isTheGameOn, ms]);
  return (
    <div>
      {isTheGameOn ? (
        <div data-testid="game">
          <GameGrid gameStore={GameStore} />
          <ControlPanel gameStore={GameStore} interval={{ ms, setMs }} />
        </div>
      ) : (
        <MeetingScreen switchOn={switchOn} />
      )}
    </div>
  );
});

export default Game;
