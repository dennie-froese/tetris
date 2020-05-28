import React from "react";
import Board from "../Board";
import Display from "../Display";
import StartButton from "../StartButton";

interface TetrisProps {
  boardWidth: number;
  boardHeight: number;
}

export default function Tetris() {
  return (
    <div>
      <Board field={[]} />
      <aside>
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Level" />
        <StartButton />
      </aside>
    </div>
  );
}
