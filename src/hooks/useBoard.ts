import { useState, useEffect } from "react";
import { createBoard } from "../gameHelpers";
import { Player } from "./usePlayer";

export type Board = number[][];

export const useBoard = (player: Player, resetPlayer: any) => {
  const [board, setBoard] = useState<Board>(createBoard);
  const [rowsCleared, setRowsCleared] = useState<number>(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newBoard: any) =>
      newBoard.reduce((ack: any, row: any) => {
        if (row.findIndex((cell: any) => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newBoard[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateBoard = (prevBoard: any) => {
      const newBoard = prevBoard.map((row: any) =>
        row.map((cell: any) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tile.forEach((row: any, y: any) => {
        row.forEach((value: any, x: any) => {
          if (value !== 0) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newBoard);
      }
      return newBoard;
    };

    setBoard((prev: any) => updateBoard(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.tile, resetPlayer]);

  return [board, setBoard, rowsCleared];
};
