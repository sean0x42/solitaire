import type { Colour, Suit } from "./game-state";

export function getSuitColour(suit: Suit): Colour {
  if (suit === "hearts" || suit === "diamonds") {
    return "red";
  }

  return "black";
}
