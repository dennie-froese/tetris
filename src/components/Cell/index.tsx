import React from "react";

interface Props {
  key: number;
  type: any;
}

export default function Cell({ key, type }: Props) {
  return <div key={key}>cell</div>;
}
