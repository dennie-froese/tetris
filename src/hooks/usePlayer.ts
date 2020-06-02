import { useState, useCallback } from "react";

import { tiles, randomTile } from "../tiles";
import { BOARD_HEIGHT, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tile: tiles[0].shape,
    collided: false
  });
};
