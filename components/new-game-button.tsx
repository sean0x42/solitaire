"use client";

import type { FC } from "react";
import { useDispatch } from "./game-state";

export const NewGameButton: FC = () => {
  const dispatch = useDispatch();

  return (
    <button onMouseDown={() => dispatch({ kind: "newGame" })}>New game</button>
  );
};
