import type { WritableDraft } from "immer";
import type { KlondikeGameState } from "./types";
import { type AutoMoveAction, autoMove } from "./actions/auto-move";
import { type NewGameAction, newGame } from "./actions/new-game";
import { type MoveAction, applyMove } from "./actions/move";
import { type DealAction, deal } from "./actions/deal";
import { type RecycleDeckAction, recycleDeck } from "./actions/recycle-deck";

export type AnyAction =
  | NewGameAction
  | AutoMoveAction
  | MoveAction
  | DealAction
  | RecycleDeckAction;

export function klondikeReducer(
  draft: WritableDraft<KlondikeGameState>,
  action: AnyAction,
) {
  if (action.kind === "newGame") {
    return newGame();
  }

  if (action.kind === "move") {
    return applyMove(draft, action);
  }

  if (action.kind === "autoMove") {
    return autoMove(draft, action);
  }

  if (action.kind === "deal") {
    return deal(draft);
  }

  if (action.kind === "recycleDeck") {
    return recycleDeck(draft);
  }

  throw new Error(`Unknown action: ${JSON.stringify(action)}`);
}
