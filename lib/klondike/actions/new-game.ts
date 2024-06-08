import {
  type Tableau,
  type CardState,
  type KlondikeGameState,
  suits,
} from "../types";
import { Option } from "~/lib/option";
import { shuffle } from "~/lib/array";

export interface NewGameAction {
  kind: "newGame";
}

export function newGame(): KlondikeGameState {
  // 1. Generate deck
  const allCards: CardState[] = [];
  for (let value = 1; value <= 13; value++) {
    for (const suit of suits) {
      allCards.push({ value, suit, facing: "down" });
    }
  }

  // 2. Shuffle
  shuffle(allCards);

  // 3. Deal tableau
  const tableau: CardState[][] = [];

  for (let columnIdx = 0; columnIdx < 7; columnIdx++) {
    const column: CardState[] = [];

    for (let rowIdx = 0; rowIdx <= columnIdx; rowIdx++) {
      const card = new Option(allCards.pop());
      column.push(card.unwrap());

      // Set the final card face up
      if (rowIdx === columnIdx) {
        card.map((card) => (card.facing = "up"));
      }
    }

    tableau.push(column);
  }

  return {
    stockPile: allCards,
    tableau: tableau as Tableau,
    wastePile: [],
    solvedPiles: [[], [], [], []],
  };
}
