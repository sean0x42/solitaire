import type { WritableDraft } from "immer";
import type { CardState, KlondikeGameState, Move, MoveFrom } from "../types";
import { takeLast } from "~/lib/array";

export interface MoveAction extends Move {
  kind: "move";
}

export function applyMove(
  draft: WritableDraft<KlondikeGameState>,
  action: MoveAction,
) {
  const cards = popCardsFromSource(draft, action);

  if (action.to === "solvedPile") {
    draft.solvedPiles[action.toColumnIndex].push(...cards);
  }

  if (action.to === "tableau") {
    draft.tableau[action.toColumnIndex].push(...cards);
  }
}

function popCardsFromSource(
  draft: WritableDraft<KlondikeGameState>,
  move: MoveFrom,
): WritableDraft<CardState[]> {
  if (move.from === "solvedPile") {
    const card = draft.solvedPiles[move.fromColumnIndex].pop();

    if (!card) {
      throw new Error(
        `Unable to pop from solved pile at column ${move.fromColumnIndex}`,
      );
    }

    return [card];
  }

  if (move.from === "tableau") {
    const cards = takeLast(
      draft.tableau[move.fromColumnIndex],
      move.fromCardIndex,
    );

    // Flip next card in column
    const nextCard = draft.tableau[move.fromColumnIndex].at(-1);
    if (nextCard) {
      nextCard.facing = "up";
    }

    return cards;
  }

  if (move.from === "wastePile") {
    const cards = draft.wastePile.splice(0, 1);

    if (cards.length === 0) {
      throw new Error(
        `Unable to pop from waste pile at column ${move.fromColumnIndex}`,
      );
    }

    cards[0].facing = "up";
    return cards;
  }

  throw new Error(`Invalid move: ${JSON.stringify(move)}`);
}
