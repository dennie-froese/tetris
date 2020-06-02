import React from "react";
import Cell from "../Cell";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../gameHelpers";

export default function Board({ board }: any) {
  return (
    <div className="tetris-board">
      {/* <div className="tetris-board__info">
        <p className="tetris-board__text">Level: {level}</p>

        <p className="tetris-board__text">Score: {score}</p>

        {gameOver && (
          <p className="tetris-board__text">
            <strong>Game Over</strong>
          </p>
        )}
      </div> */}
      <div
        className="tetris-board__board"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(
            ${BOARD_HEIGHT},
            calc(25vw / ${BOARD_WIDTH})
          )`,
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridGap: "1px",
          border: "2px solid ",
          width: "100%",
          background: "#111"
        }}
      >
        {board.map((row: any) =>
          row.map((cell: any, x: number) => <Cell key={x} type={cell[0]} />)
        )}
      </div>
    </div>
  );
}
