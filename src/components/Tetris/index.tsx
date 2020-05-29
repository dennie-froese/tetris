import React, { useEffect, useState } from "react";
import Board from "../Board";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../../gameHelpers";
import tiles from "../../tiles";

export default function Tetris() {
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeTile, setActiveTile] = useState(1);
  const [activeTileX, setActiveTileX] = useState(1);
  const [activeTileY, setActiveTileY] = useState(1);
  const [tileRotate, setTileRotate] = useState(0);
  const [field, setField] = useState<number[][]>([]);

  let fieldArray = [];

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    let row = [];

    for (let x = 0; x < BOARD_WIDTH; x++) {
      row.push(0);
    }

    fieldArray.push(row);
  }

  setField(fieldArray);

  let startX = Math.floor(BOARD_WIDTH / 2);

  useEffect(() => {
    let time = window.setInterval(
      () => handleBoardUpdate("down"),
      1000 - (level * 10 > 600 ? 600 : level * 10)
    );
    setTimer(time);

    return function cleanup() {
      window.clearInterval(time);
    };
  }, []);

  function handleBoardUpdate(command: string) {
    if (gameOver || isPaused) {
      return;
    }

    let xAdd = 0;
    let yAdd = 0;
    let rotateAdd = 0;
    let tile = activeTile;

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
