import { useState, useCallback } from "react";

import { tiles, randomTile, TilesShapes } from "../tiles";
import { BOARD_HEIGHT, checkCollision } from "../gameHelpers";

type Keys = "pos" | "tile" | "collided";

export type Player = {
  [k in Keys]: { x: number; y: number } | TilesShapes | boolean;
};

export const usePlayer = () => {
  const [player, setPlayer] = useState<any>({
    pos: { x: 0, y: 0 },
    tile: tiles[0].shape,
    collided: false
  });
};
