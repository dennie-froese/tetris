import { useState, useCallback, SetStateAction, Dispatch } from "react";

import {
  tiles,
  randomTile,
  TileZero,
  TileTwo,
  TileThree,
  TileFour
} from "../tiles";
import { checkCollision, BOARD_WIDTH } from "../gameHelpers";
import { Board } from "./useBoard";

type KeysPosition = "x" | "y";

type PosObject = {
  [k in KeysPosition]: number;
};

type PlayerObjects =
  | TileZero["shape"]
  | TileTwo["shape"]
  | TileThree["shape"]
  | TileFour["shape"];

export type Player = {
  pos: PosObject;
  tile: PlayerObjects;
  collided: boolean;
};
interface Props {
  x: number;
  y: number;
  collided: boolean;
}

type PlayerRotateFunc = (board: Board, dir: number) => void;
type PlayerUpdateFunc = ({ x, y, collided }: Props) => void;
type PlayerResetFunc = () => void;

type Hook = () =>
  | Player
  | PlayerRotateFunc
  | PlayerUpdateFunc
  | PlayerResetFunc;

export type PlayerProps = Player | Dispatch<SetStateAction<Player>>;

export const usePlayer = (): [
  Player,
  PlayerUpdateFunc,
  PlayerRotateFunc,
  PlayerResetFunc
] => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tile: tiles[0].shape,
    collided: false
  });

  function rotate(matrix: PlayerObjects[], dir: number) {
    const mtrx = matrix.map((_: any[], index: number) =>
      matrix.map((column: any) => column[index])
    );
    if (dir > 0) return mtrx.map((row: number[]) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(board: Board, dir: number) {
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

  const updatePlayerPos = ({ x, y, collided }: Props) => {
    setPlayer(
      (prev): Player => {
        return {
          ...prev,
          pos: { x: prev.pos.x += x, y: prev.pos.y += y },
          collided
        };
      }
    );
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tile: randomTile().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, playerRotate, resetPlayer];
};
