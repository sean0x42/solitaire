import type { Colour, Suit } from "./klondike";

export function getSuitColour(suit: Suit): Colour {
  if (suit === "hearts" || suit === "diamonds") {
    return "red";
  }

  return "black";
}
