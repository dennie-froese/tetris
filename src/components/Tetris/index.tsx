import React from "react";
import Board from "../Board";
import Display from "../Display";
import StartButton from "../StartButton";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../gameHelpers";

interface TetrisProps {
  boardWidth: number;
  boardHeight: number;
}

export default function Tetris() {
  const board = Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
  return (
    <div>
      <Board field={board} />
      <aside>
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Level" />
        <StartButton />
      </aside>
    </div>
  );
}
