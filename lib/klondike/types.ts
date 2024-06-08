export const suits = ["hearts", "diamonds", "clubs", "spades"] as const;
export type Suit = (typeof suits)[number];

export type Colour = "red" | "black";

export type Facing = "up" | "down";

export interface CardState {
  value: number;
  suit: Suit;
  facing: Facing;
}

export type Tableau = [
  CardState[],
  CardState[],
  CardState[],
  CardState[],
  CardState[],
  CardState[],
  CardState[],
];

export type SolvedPiles = [CardState[], CardState[], CardState[], CardState[]];

export interface KlondikeGameState {
  readonly stockPile: CardState[];
  readonly wastePile: CardState[];
  readonly tableau: Tableau;
  readonly solvedPiles: SolvedPiles;
}

export type Source = "tableau" | "solvedPile" | "wastePile";
export type Destination = "tableau" | "solvedPile";

export interface MoveFrom {
  from: Source;
  fromColumnIndex: number;
  fromCardIndex: number;
}

export interface MoveTo {
  to: Destination;
  toColumnIndex: number;
}

export type Move = MoveFrom & MoveTo;
