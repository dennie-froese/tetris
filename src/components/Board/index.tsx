import React from "react";
import Cell from "../Cell";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../gameHelpers";

export default function Board({ board }: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(
            ${BOARD_HEIGHT},
            calc(25vw / ${BOARD_WIDTH})
          )`,
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
        border: "2px solid ",
        width: "100%",
        background: "#111"
      }}
    >
      {board.map((row: [][]) =>
        row.map((cell: any, x: number) => <Cell keyVal={x} type={cell[0]} />)
      )}
    </div>
  );
}
