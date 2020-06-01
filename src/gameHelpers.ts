export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 20;

export const createBoard = () =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_HEIGHT).fill([0, "clear"]));
