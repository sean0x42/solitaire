import { type Dispatch, createContext } from "react";
import type { AnyAction, KlondikeGameState } from "~/lib/klondike";

export interface GameContextValue {
  gameState: KlondikeGameState;
  dispatch: Dispatch<AnyAction>;
}

export const GameContext = createContext<GameContextValue>(
  null as unknown as GameContextValue,
);
