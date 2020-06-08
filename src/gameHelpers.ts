import { Player } from "./hooks/usePlayer";

export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 20;

export const createBoard = () =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill([0, "clear"]));

export const checkCollision = (
  player: Player,
  board: any,
  { x: moveX, y: moveY }: any
) => {
  for (let y = 0; y < player.tile.length; y += 1) {
    for (let x = 0; x < player.tile[y].length; x += 1) {
      if (player.tile[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
