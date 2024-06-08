import type { WritableDraft } from "immer";
import type { KlondikeGameState } from "../types";

export interface DealAction {
  kind: "deal";
}

export function deal(draft: WritableDraft<KlondikeGameState>) {
  // 1. Move any cards from waste pile back to stock pile
  draft.stockPile.push(...draft.wastePile);

  // 2. Draw next three cards from stock pile to waste pile
  draft.wastePile = draft.stockPile.splice(0, 3);
}
