import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createBoard } from "../gameHelpers";
import { Player, PlayerResetFunc } from "./usePlayer";

export type Board = number[][];

export const useBoard = (
  player: Player,
  resetPlayer: PlayerResetFunc
): [Board, Dispatch<SetStateAction<number[][]>>, number] => {
  const [board, setBoard] = useState<Board>(createBoard());
  const [rowsCleared, setRowsCleared] = useState<number>(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newBoard: Board) =>
      newBoard.reduce((ack: Board, row: number[]) => {
        if (row.findIndex((cell: any) => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newBoard[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateBoard = (prevBoard: Board) => {
      const newBoard = prevBoard.map((row: number[]) =>
        row.map((cell: any) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tile.forEach((row: any, y: number) => {
        row.forEach((value: string | number, x: number) => {
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

    setBoard((prev: Board) => updateBoard(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.tile, resetPlayer]);

  return [board, setBoard, rowsCleared];
};
