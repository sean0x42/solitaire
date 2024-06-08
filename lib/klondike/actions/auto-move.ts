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
  const { card, isLastInColumn } = peekCard(draft, action);

  // This can happen in dev mode because react fires actions twice
  if (card === undefined) {
    throw new Error(
      `No card in ${action.from} column ${action.fromColumnIndex}`,
    );
  }

  getFirstValidMove(draft, card, isLastInColumn).map((move) =>
    applyMove(draft, { ...move, ...action, kind: "move" }),
  );
}

interface Peek {
  card: CardState | undefined;
  isLastInColumn: boolean;
}

function peekCard(state: KlondikeGameState, move: MoveFrom): Peek {
  if (move.from === "tableau") {
    return {
      card: state.tableau[move.fromColumnIndex].at(move.fromCardIndex),
      isLastInColumn:
        move.fromCardIndex === state.tableau[move.fromColumnIndex].length - 1,
    };
  }

  if (move.from === "wastePile") {
    return {
      card: state.wastePile.at(0),
      isLastInColumn: true,
    };
  }

  if (move.from === "solvedPile") {
    return {
      card: state.solvedPiles[move.fromColumnIndex].at(move.fromCardIndex),
      isLastInColumn: true,
    };
  }

  throw new Error(`Invalid move: ${JSON.stringify(move)}`);
}

function getFirstValidMove(
  state: KlondikeGameState,
  card: CardState,
  isLastInColumn: boolean,
): Option<MoveTo> {
  const moves: MoveTo[] = [
    ...getMovesToSolvedPile(state, card, isLastInColumn),
    ...getMovesToTableau(state, card),
  ];

  return new Option(moves[0]);
}

// TODO cleanup
function getMovesToSolvedPile(
  state: KlondikeGameState,
  card: CardState,
  isLastCardInColumn: boolean,
): MoveTo[] {
  const moves: MoveTo[] = [];

  if (!isLastCardInColumn) {
    return moves;
  }

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
