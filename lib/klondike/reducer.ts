import type { WritableDraft } from "immer";
import type { KlondikeGameState } from "./types";
import { type AutoMoveAction, autoMove } from "./actions/auto-move";
import { type NewGameAction, newGame } from "./actions/new-game";
import { type MoveAction, applyMove } from "./actions/move";
import { type DealAction, deal } from "./actions/deal";

export type AnyAction =
  | NewGameAction
  | AutoMoveAction
  | MoveAction
  | DealAction;

export function klondikeReducer(
  draft: WritableDraft<KlondikeGameState>,
  action: AnyAction,
) {
  console.debug({ action });

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

  throw new Error(`Unknown action: ${JSON.stringify(action)}`);
}
