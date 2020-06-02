import { useState, useCallback } from "react";

import { tiles, randomTile, TilesShapes } from "../tiles";
import { BOARD_HEIGHT, checkCollision } from "../gameHelpers";

type Keys = "pos" | "tile" | "collided";
type KeysPosition = "y" | "x";

type PosObject = {
  [k in KeysPosition]: number;
};

export type Player = {
  [k in Keys]: PosObject | TilesShapes | boolean;
};

export const usePlayer = () => {
  const [player, setPlayer] = useState<any>({
    pos: { x: 0, y: 0 },
    tile: tiles[0].shape,
    collided: false
  });

  function rotate(matrix: any, dir: number) {
    const mtrx = matrix.map((_: any, index: number) =>
      matrix.map((column: any) => column[index])
    );
    if (dir > 0) return mtrx.map((row: any) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(board: any, dir: number) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tile = rotate(clonedPlayer.tile, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tile[0].length) {
        rotate(clonedPlayer.tile, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }
};
