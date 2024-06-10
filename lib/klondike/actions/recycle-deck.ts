import { WritableDraft } from "immer";
import { KlondikeGameState } from "../types";

export interface RecycleDeckAction {
  kind: "recycleDeck";
}

export function recycleDeck(draft: WritableDraft<KlondikeGameState>) {
  draft.discardPile.push(...draft.wastePile);
  draft.wastePile = [];
  draft.stockPile.push(...draft.discardPile);
  draft.discardPile = [];
}
