import React from "react";

interface Props {
  key: number;
  className: string;
}

export default function Cell({ key, className }: Props) {
  return <div className={className} key={key} />;
}
