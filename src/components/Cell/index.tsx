import React from "react";
import { tiles, Keys } from "../../tiles";

interface Props {
  key: number;
  className: Keys;
}

export default function Cell({ key, className }: Props) {
  return (
    <div
      className={`cell-${className.toString()}`}
      key={key}
      style={{ color: tiles[className].color }}
    />
  );
}
