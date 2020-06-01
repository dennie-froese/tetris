export type TileZero = {
  shape: [[number]];
  color: string;
};
export type TileTwo = {
  shape: [
    [number | string, number | string],
    [number | string, number | string]
  ];
  color: string;
};
export type TileThree = {
  shape: [
    [number | string, number | string, number | string],
    [number | string, number | string, number | string],
    [number | string, number | string, number | string]
  ];
  color: string;
};
export type TileFour = {
  shape: [
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string]
  ];
  color: string;
};

type Keys = 0 | "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type TilesType = {
  [K in Keys]: TileZero | TileTwo | TileThree | TileFour;
};

export const tiles: TilesType = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ],
    color: "80, 227, 230"
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ],
    color: "36, 95, 223"
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ],
    color: "223, 173, 36"
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ],
    color: "223, 217, 36"
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ],
    color: "48, 211, 56"
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0]
    ],
    color: "132, 61, 198"
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0]
    ],
    color: "227, 78, 78"
  }
};

export function randomTile() {
  const tilesArray: Keys[] = ["I", "J", "L", "O", "S", "T", "Z"];
  const random = tilesArray[Math.floor(Math.random() * tilesArray.length)];

  return tiles[random];
}
