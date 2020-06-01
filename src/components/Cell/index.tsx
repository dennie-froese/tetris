import React from "react";
import { tiles, Keys } from "../../tiles";

interface Props {
  key: number;
  type: Keys;
}

function Cell({ key, type }: Props) {
  return (
    <div
      className={`cell-${type.toString()}`}
      key={key}
      style={{ color: tiles[type].color }}
    />
  );
}

export default React.memo(Cell);
