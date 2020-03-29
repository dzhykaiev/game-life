import React, { useRef } from "react";
import { Game as GameStoreType } from "../../containers/Game/Store";
import { observer } from "mobx-react";
type Props = {
  gameStore: GameStoreType;
};

const GameGrid = observer((props: Props) => {
  // Canvas size
  const canvasWidth: number = 500;
  const canvasHeight: number = 500;
  // Single square size
  const cellHeight: number = canvasHeight / props.gameStore.gridSize;
  const cellWidth: number = canvasWidth / props.gameStore.gridList.length;
  // X * Y sizes
  const gridSize: number = props.gameStore.gridSize;
  const gridRowSize: number = props.gameStore.gridList.length;
  // Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext("2d");
  // Square
  for (let i = 0, y = 0; i < gridSize; i++, y += cellHeight) {
    for (let j = 0, x = 0; j < gridRowSize; j++, x += cellWidth) {
      if (ctx) {
        ctx.fillStyle = props.gameStore.gridList[i][j] ? "black" : "white";
        ctx.strokeStyle = "#ccc";
        ctx.strokeRect(x, y, cellHeight, cellWidth);
        ctx.fillRect(x, y, cellHeight, cellWidth);
      }
    }
  }
  return (
    <canvas
      style={{
        margin: "20px auto",
        display: "block",
        border: "1px solid #ccc"
      }}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    ></canvas>
  );
});

export default GameGrid;
