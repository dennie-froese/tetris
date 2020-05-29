import React, { useEffect, useState } from "react";
import Board from "../Board";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../../gameHelpers";

export default function Tetris() {
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  let field = [];

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    let row = [];

    for (let x = 0; x < BOARD_WIDTH; x++) {
      row.push(0);
    }

    field.push(row);
  }

  return (
    <div className="tetris">
      <Board field={field} />
    </div>
  );
}
