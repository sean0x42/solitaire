"use client";

import type { FC } from "react";
import { Card } from "~/components/card";
import { useDispatch, useGameState } from "./game-state";

export const StockPile: FC = () => {
  const dispatch = useDispatch();

  const { stockPile, discardPile } = useGameState();
  const topCard = stockPile[stockPile.length - 1];

  return (
    <div className="col-span-1">
      {topCard && (
        <Card
          {...topCard}
          facing="down"
          onMouseDown={() => {
            dispatch({ kind: "deal" });
          }}
        />
      )}

      {stockPile.length === 0 && discardPile.length !== 0 && (
        <button
          className="w-full aspect-card bg-green-800 rounded-lg"
          onMouseDown={() => dispatch({ kind: "recycleDeck" })}
        >
          Recycle
        </button>
      )}
    </div>
  );
};
