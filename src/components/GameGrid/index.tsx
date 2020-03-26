import React from "react";
import { Game as GameStoreType } from "../../containers/Game/Store";
import uniqid from "uniqid";
import { observer } from "mobx-react";
import s from "./GameGrid.module.scss";
type Props = {
  gameStore: GameStoreType;
};

const GameGrid = observer((props: Props) => {
  const cellSize = 500 / props.gameStore.gridSize;
  const rowSize = 500 / props.gameStore.gridList.length;
  return (
    <div className={s.Grid}>
      {props.gameStore.gridList?.map(row => (
        <div
          className={s.Row}
          key={"row-" + uniqid()}
          style={{ height: rowSize }}
        >
          {row.map(cell => {
            return (
              <div
                key={"cell-" + uniqid()}
                className={`${s.Cell} ${cell ? s.alive : ""}`}
                style={{ width: cellSize, height: cellSize }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default GameGrid;
