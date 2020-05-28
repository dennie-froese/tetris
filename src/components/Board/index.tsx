import React from "react";
import Cell from "../Cell";

interface Props {
  field: any[];
}

export default function Board({ field }: Props) {
  return (
    <div>
      {field.map(row =>
        row.map((cell: any, x: number) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
}
