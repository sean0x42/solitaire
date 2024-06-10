import type { KlondikeGameState } from "./types";

export const klondikeInitialState: KlondikeGameState = {
  stockPile: [],
  wastePile: [],
  discardPile: [],
  solvedPiles: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
};
