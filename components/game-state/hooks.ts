import { type Dispatch, useContext } from "react";
import { GameContext } from "./context";
import type { AnyAction, KlondikeGameState } from "~/lib/klondike";

export function useGameState(): KlondikeGameState {
  return useContext(GameContext).gameState;
}

export function useDispatch(): Dispatch<AnyAction> {
  return useContext(GameContext).dispatch;
}
