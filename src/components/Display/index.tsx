import React from "react";

interface Props {
  text: string;
  gameOver?: boolean;
}

export default function Display({ text, gameOver }: Props) {
  return <div>{text}</div>;
}
