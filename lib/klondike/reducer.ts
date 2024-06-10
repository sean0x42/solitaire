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
  switch (action.kind) {
    case "newGame":
      return newGame();
    case "autoMove":
      return autoMove(draft, action);
    case "move":
      return applyMove(draft, action);
    case "deal":
      return deal(draft);
    case "recycleDeck":
      return recycleDeck(draft);
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
}
