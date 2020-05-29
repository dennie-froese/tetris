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

  let startX = Math.floor(BOARD_WIDTH / 2);

  useEffect(() => {
    let time = window.setInterval(
      () => handleBoardUpdate("down"),
      1000 - (level * 10 > 600 ? 600 : level * 10)
    );
    setTimer(time);
  }, []);

  function handleBoardUpdate(command: string) {
    if (gameOver || isPaused) {
      return;
    }
    if (command === "left") {
    }
    if (command === "right") {
    }
    if (command === "down") {
    }
    if (command === "rotate") {
    }
    return null;
  }

  return (
    <div className="tetris">
      <Board field={field} />
    </div>
  );
}
