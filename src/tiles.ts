export type TyleZero = {
  shape: [[number]];
  color: string;
};
export type TyleTwo = {
  shape: [
    [number | string, number | string],
    [number | string, number | string]
  ];
  color: string;
};
export type TyleThree = {
  shape: [
    [number | string, number | string, number | string],
    [number | string, number | string, number | string],
    [number | string, number | string, number | string]
  ];
  color: string;
};
export type TyleFour = {
  shape: [
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string],
    [number | string, number | string, number | string, number | string]
  ];
  color: string;
};

export type Tyles = {
  0: TyleZero;
  I: TyleFour;
  J: TyleThree;
  L: TyleThree;
  O: TyleTwo;
  S: TyleThree;
  T: TyleThree;
  Z: TyleThree;
};

export const tiles: Tyles = {
  0: { shape: [[0]], color: "0,0,0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ],
    color: "90, 227, 230"
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
      [0, 0],
      [0, 0]
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
