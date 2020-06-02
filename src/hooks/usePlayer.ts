import { useState, useCallback } from "react";

import {
  tiles,
  randomTile,
  TileZero,
  TileTwo,
  TileThree,
  TileFour
} from "../tiles";
import { checkCollision, BOARD_WIDTH } from "../gameHelpers";

type Keys = "pos" | "tile" | "collided";
type KeysPosition = "x" | "y";

type PosObject = {
  [k in KeysPosition]: number;
};

type PlayerObjects =
  | PosObject
  | TileZero["shape"]
  | TileTwo["shape"]
  | TileThree["shape"]
  | TileFour["shape"]
  | boolean;

export type Player = {
  [k in Keys]: PlayerObjects;
};

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player | undefined>({
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

  const updatePlayerPos = ({ x, y, collided }: any) => {
    setPlayer((prev: any) => ({
      ...prev,
      pos: { x: prev.pos.x += x, y: prev.pos.y += y },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tile: randomTile().shape,
      collided: false
    });
  }, []);

  return [player, playerRotate, updatePlayerPos, resetPlayer];
};
