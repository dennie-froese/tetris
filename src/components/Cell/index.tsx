import React from "react";
import { Keys } from "../../tiles";

interface Props {
  keyVal: number;
  type: Keys;
}

function Cell({ keyVal, type }: Props) {
  return <div className={`cell-${type}`} key={keyVal} />;
}

export default React.memo(Cell);
