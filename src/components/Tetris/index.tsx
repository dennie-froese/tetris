import React, { useEffect, useState } from "react";
import Board from "../Board";

import { createBoard, checkCollision } from "../../gameHelpers";
import { usePlayer } from "../../hooks/usePlayer";
import { useBoard } from "../../hooks/useBoard";
import { useGameStatus } from "../../hooks/useGameStatus";
import { useInterval } from "../../hooks/useInterval";
import Display from "../Display";
import StartButton from "../StartButton";

export default function Tetris() {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus({
    rowsCleared
  });

  // console.log("re-render");

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = (keyCode: number) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev: any) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const move = (keyCode: number) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(board, 1);
      }
    }
  };

  return (
    <div
      className="tetris"
      onKeyDown={(e: any) => move(e)}
      onKeyUp={(e: any) => keyUp(e)}
    >
      <Board board={board} />
      <aside>
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" />
        ) : (
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
          </div>
        )}
        <StartButton callback={startGame} />
      </aside>
    </div>
  );
}
