import type { WritableDraft } from "immer";

import type { CardState, KlondikeGameState, MoveFrom, MoveTo } from "../types";
import { Option } from "~/lib/option";
import { getSuitColour } from "~/lib/get-suit-color";
import { applyMove } from "./move";

export interface AutoMoveAction extends MoveFrom {
  kind: "autoMove";
}

export function autoMove(
  draft: WritableDraft<KlondikeGameState>,
  action: AutoMoveAction,
) {
  const card = peekCard(draft, action);

  // This can happen in dev mode because react fires actions twice
  if (card === undefined) {
    throw new Error(
      `No card in ${action.from} column ${action.fromColumnIndex}`,
    );
  }

  getFirstValidMove(draft, card).map((move) =>
    applyMove(draft, { ...move, ...action, kind: "move" }),
  );
}

function peekCard(
  state: KlondikeGameState,
  move: MoveFrom,
): CardState | undefined {
  if (move.from === "tableau") {
    return state.tableau[move.fromColumnIndex].at(move.fromCardIndex);
  }

  if (move.from === "wastePile") {
    return state.wastePile.at(0);
  }

  if (move.from === "solvedPile") {
    return state.solvedPiles[move.fromColumnIndex].at(move.fromCardIndex);
  }

  throw new Error(`Invalid move: ${JSON.stringify(move)}`);
}

function getFirstValidMove(
  state: KlondikeGameState,
  card: CardState,
): Option<MoveTo> {
  const moves: MoveTo[] = [
    ...getMovesToSolvedPile(state, card),
    ...getMovesToTableau(state, card),
  ];

  return new Option(moves[0]);
}

// TODO cleanup
function getMovesToSolvedPile(
  state: KlondikeGameState,
  card: CardState,
): MoveTo[] {
  const moves: MoveTo[] = [];

  state.solvedPiles.forEach((column, toColumnIndex) => {
    // Aces can only go to empty solved piles
    if (card.value === 1) {
      if (column.length === 0) {
        moves.push({ to: "solvedPile", toColumnIndex });
      }

      return;
    }

    if (column.length === 0) {
      return;
    }

    const lastCard = column[column.length - 1];
    if (lastCard.suit === card.suit && lastCard.value === card.value - 1) {
      moves.push({ to: "solvedPile", toColumnIndex });
    }
  });

  return moves;
}

// TODO cleanup
function getMovesToTableau(
  state: KlondikeGameState,
  card: CardState,
): MoveTo[] {
  const moves: MoveTo[] = [];

  state.tableau.forEach((column, toColumnIndex) => {
    // Kings can only go to empty columns
    if (card.value === 13) {
      if (column.length === 0) {
        moves.push({ to: "tableau", toColumnIndex });
      }

      return;
    }

    if (column.length === 0) {
      return;
    }

    const lastCard = column[column.length - 1];
    if (
      getSuitColour(lastCard.suit) !== getSuitColour(card.suit) &&
      lastCard.value === card.value + 1
    ) {
      moves.push({ to: "tableau", toColumnIndex });
    }
  });

  return moves;
}
