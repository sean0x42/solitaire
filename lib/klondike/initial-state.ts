import type { KlondikeGameState } from "./types";

export const klondikeInitialState: KlondikeGameState = {
  stockPile: [],
  wastePile: [],
  solvedPiles: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
};
