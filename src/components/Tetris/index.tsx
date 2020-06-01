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
      xAdd = -1;
    }
    if (command === "right") {
      xAdd = 1;
    }
    if (command === "down") {
      yAdd = 1;
    }
    if (command === "rotate") {
      rotateAdd = +1;
    }

    let fieldVar = field;
    let x = activeTileX;
    let y = activeTileY;
    let rotate = tileRotate;

    fieldVar[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = 0;
    fieldVar[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = 0;
    fieldVar[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = 0;
    fieldVar[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = 0;

    let xAddIsValid = true;

    if (xAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        if (
          x + xAdd + tiles[tile][rotate][i][0] >= 0 &&
          x + xAdd + tiles[tile][rotate][i][0] < BOARD_WIDTH
        ) {
          if (
            field[y + tiles[tile][rotate][i][1]][
              x + xAdd + tiles[tile][rotate][i][0]
            ] !== 0
          ) {
            xAddIsValid = false;
          }
        } else {
          xAddIsValid = false;
        }
      }
    }

    if (xAddIsValid) {
      x += xAdd;
    }

    let newRotate = rotate + rotateAdd > 3 ? 0 : rotate + rotateAdd;
    let rotateIsValid = true;

    if (rotateAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        if (
          x + tiles[tile][newRotate][i][0] >= 0 &&
          x + tiles[tile][newRotate][i][0] < BOARD_WIDTH &&
          y + tiles[tile][newRotate][i][0] >= 0 &&
          y + tiles[tile][newRotate][i][0] < BOARD_HEIGHT
        ) {
          if (
            field[y + tiles[tile][newRotate][i][1]][
              x + tiles[tile][newRotate][i][0]
            ] !== 0
          ) {
            rotateIsValid = false;
          }
        } else {
          rotateIsValid = false;
        }
      }
    }

    if (rotateIsValid) {
      rotate = newRotate;
    }

    let yAddIsValid = true;

    if (yAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        if (
          y + yAdd + tiles[tile][rotate][i][1] >= 0 &&
          y + yAdd + tiles[tile][rotate][i][1] < BOARD_HEIGHT
        ) {
          if (
            field[y + yAdd + tiles[tile][rotate][i][1]][
              x + tiles[tile][rotate][i][0]
            ] !== 0
          ) {
            yAddIsValid = false;
          }
        } else {
          yAddIsValid = false;
        }
      }
    }

    if (yAddIsValid) {
      y += yAdd;
    }

    fieldVar[y + tiles[tile][rotate][0][1]][
      x + tiles[tile][rotate][0][0]
    ] = tile;
    fieldVar[y + tiles[tile][rotate][1][1]][
      x + tiles[tile][rotate][1][0]
    ] = tile;
    fieldVar[y + tiles[tile][rotate][2][1]][
      x + tiles[tile][rotate][2][0]
    ] = tile;
    fieldVar[y + tiles[tile][rotate][3][1]][
      x + tiles[tile][rotate][3][0]
    ] = tile;
  }

  return (
    <div className="tetris">
      <Board field={field} />
    </div>
  );
}
