import React, { useEffect } from "react";
import Cell from "../Cell";

interface Props {
  field: any[];
  gameOver?: boolean;
  score?: number;
  level?: number;
  rotate?: number;
}

export default function Board({ field, gameOver, score, level }: Props) {
  let rows: any[] = [];

  field.forEach((row, index) => {
    const cols = row.map((column: any, index: number) => (
      <Cell className={`col-${column}`} key={index} />
    ));

    rows.push(
      <div className="tetris-board__row" key={index}>
        {cols}
      </div>
    );
  });

  return (
    <div className="tetris-board">
      <div className="tetris-board__info">
        <p className="tetris-board__text">Level: {level}</p>

        <p className="tetris-board__text">Score: {score}</p>

        {gameOver && (
          <p className="tetris-board__text">
            <strong>Game Over</strong>
          </p>
        )}
      </div>
      <div className="tetris-board__board">{rows}</div>
    </div>
  );
}
