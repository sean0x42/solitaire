"use client";

import type { FC, PropsWithChildren } from "react";
import { useImmerReducer } from "use-immer";
import { klondikeInitialState, klondikeReducer } from "~/lib/klondike";
import { GameContext } from "./context";

export const GameStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameState, dispatch] = useImmerReducer(
    klondikeReducer,
    klondikeInitialState,
  );

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
